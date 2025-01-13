import {GenerationStatus} from "./GeneratingIndicator.tsx"
import {MutableRefObject} from "react"
import {backendBaseUrl} from "../environment.ts"
import {sessionHeaders} from "../common/track.ts"
import {LineParser, regexLineParser, RegexLineParserSpec, StreamingText} from "./streaming-text.ts"
import {createParser, EventSourceMessage, ParseError} from "eventsource-parser"
import {createReferenceMarkdownLink, Reference} from "./reference-link.ts"

export type ServerCommand = "selectParties"

export class CancelController {
    private cancelled = false

    cancel() {
        this.cancelled = true
    }

    get isCancelled() {
        return this.cancelled
    }
}

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
    setThreadId(response.headers.get("thread-id") ?? undefined)
    if (!response.body) {
        console.error("Response body is empty")
        onErrorCallback()
        return
    }

    const answer = new StreamingText(...lineParsers)
    const onEvent = ({event, data}: EventSourceMessage) => {
        try {
            console.debug(`Start processing event ${event}`, data)
            if (event === "message") {
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
            console.debug(`Done processing event ${event}`, data)
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
    const parser = createParser({onEvent, onError})
    const reader: ReadableStreamDefaultReader<Uint8Array> = response.body.getReader()
    for await (const chunk of readerToAsyncIterator(reader)) {
        if (cancelController.isCancelled) {
            console.log("Cancelling request")
            await reader.cancel()
            break
        } else {
            console.debug(chunk) //TODO: remove for production
            parser.feed(chunk)
        }
    }
    if (!cancelController.isCancelled) {
        console.log("Received full response")
        onDone(answer.finalize())
    }
}

const referenceParser: RegexLineParserSpec = {
    regex: /〔([^〕]+)〕/g,
    replacer: (match, [refJson]) => {
        try {
            const ref = JSON.parse(refJson) as Reference
            return " " + createReferenceMarkdownLink(ref)
        } catch (e) {
            console.error(`Failed to parse reference: ${refJson}`)
            console.error(e)
            return match
        }
    }
}

const suppressNativeReferenceParser: RegexLineParserSpec = {
    regex: /【([^】]+)】/g,
    replacer: () => ""
}

const lineParsers: LineParser[] = [
    regexLineParser(suppressNativeReferenceParser),
    regexLineParser(referenceParser),
]

async function* readerToAsyncIterator(reader: ReadableStreamDefaultReader<Uint8Array>): AsyncGenerator<string, void, unknown> {
    const decoder = new TextDecoder()
    try {
        while (true) {
            const {done, value} = await reader.read()
            if (done) break
            yield decoder.decode(value)
        }
    } finally {
        reader.releaseLock()
    }
}