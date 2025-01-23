import {GenerationStatus} from "./GeneratingIndicator.tsx"
import {MutableRefObject} from "react"
import {backendBaseUrl} from "../environment.ts"
import {sessionHeaders} from "../common/track.ts"
import {StreamingText} from "./streaming-text.ts"
import {createParser, EventSourceMessage, ParseError} from "eventsource-parser"
import {fetchResponse, lineParsers} from "./load-messages.ts"

//
// SSE reading
//

export class CancelController {
    private cancelled = false

    cancel() {
        this.cancelled = true
    }

    get isCancelled() {
        return this.cancelled
    }
}

export type ServerCommand = "selectParties"

export async function sendQuestion(
    message: string,
    threadId: string | undefined,
    setThreadId: (threadId: string | undefined) => void,
    updateStatus: (status: GenerationStatus) => void,
    updateAnswer: (answer: string) => void,
    updateSuggestions: (set: (pref: string[]) => string[]) => void,
    onCommand: (command: ServerCommand) => void,
    onDone: (answer: string) => void,
    onErrorCallback: () => void,
    cancelControllerRef: MutableRefObject<CancelController | undefined>,
): Promise<void> {
    const cancelController = new CancelController()
    cancelControllerRef.current = cancelController
    if (cancelController.isCancelled) {
        console.log("Request cancelled before sending")
        return
    }

    const url = threadId ? `${backendBaseUrl}/api/thread/${threadId}` : `${backendBaseUrl}/api/thread`
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "text/plain", ...sessionHeaders},
        body: message,
    })
    if (!response.ok) {
        console.error(`fetching response failed with status ${response.status}`)
        onErrorCallback()
        return
    }
    const _threadId = threadId ?? response.headers.get("thread-id")!
    setThreadId(response.headers.get("thread-id") ?? undefined)
    if (!response.body) {
        console.error("Response body is empty")
        onErrorCallback()
        return
    }

    let runId: string | undefined = undefined
    const answer = new StreamingText(...lineParsers)
    const onEvent = ({event, data}: EventSourceMessage) => {
        try {
            if (event === "runId") {
                runId = data
                console.log(`Received runId: ${runId}`)
            } else if (event === "message") {
                updateStatus("generating")
                updateAnswer(answer.push(data))
            } else if (event === "command") {
                onCommand(data as ServerCommand)
            } else if (event === "followUpQuestion") {
                updateSuggestions(prev => {
                    const suggestions = [...prev, data]
                    return Array.from(new Set(suggestions))
                })
            } else if (event === "status" && data === "searching") {
                updateStatus(data)
            } else {
                console.warn(`Unknown event: ${event}`)
            }
        } catch (e) { // todo: should be removed or made a better exception handling
            console.error(`Error processing this event ${event}`, data)
            console.error("Error", e)
            onErrorCallback()
        }
    }
    const onError = (error: ParseError) => {
        console.error("Error parsing event source message", error)
        onErrorCallback()
    }
    const onRetry = (retry: number) => {
        console.warn(`Server requested retry in ${retry}ms`)
    }
    try {
        const parser = createParser({onEvent, onError, onRetry})
        const reader: ReadableStreamDefaultReader<Uint8Array> = response.body.getReader()
        reader.closed.then(() => console.log("reader closed")).catch(e => console.warn("Error closing reader", e))
        for await (const chunk of readerToAsyncIterator(reader)) {
            if (cancelController.isCancelled) {
                console.log("Cancelling request")
                await reader.cancel()
                break
            } else {
                parser.feed(chunk)
            }
        }
        if (!cancelController.isCancelled) {
            console.log("Received full response")
            onDone(answer.finalize())
        }
    } catch (e) {
        console.warn("Timeout while reading stream:", e)
        try {
            if (runId) {
                onDone(await fetchResponse(_threadId, runId))
            }
        } catch (e) {
            console.error("Error while fallback loading of messages:", e)
            onErrorCallback()
        }
    }
}

const timeout = 30 * 1000 // time after the last event has been received in seconds

async function* readerToAsyncIterator(
    reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string, void, unknown> {
    const decoder = new TextDecoder();

    try {
        while (true) {
            // on iPhone from time to time the SSE stream stops to receive events and I don't know why
            // So I'm adding a timeout. If it fires the generated message will be loaded from the server
            const { done, value } = await readWithTimeout(reader.read(), timeout);

            if (done) {
                console.debug("Stream reader finished");
                break;
            }

            yield decoder.decode(value);
        }
    } finally {
        reader.releaseLock();
    }
}

async function readWithTimeout<T>(
    readerPromise: Promise<T>,
    timeoutMs: number
): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Stream timeout")), timeoutMs)
    );
    return Promise.race([readerPromise, timeout]);
}
