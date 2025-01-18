import {backendBaseUrl} from "../environment.ts"
import {sessionHeaders} from "../common/track.ts"
import {LineParser, regexLineParser, RegexLineParserSpec, StreamingText} from "./streaming-text.ts"
import {createReferenceMarkdownLink, Reference} from "./reference-link.ts"

export type Message = {
    id: string
    type: "question" | "answer"
    content: string
}

type MessageResult = {
    messages: Message[]
    hasMore?: boolean
}

export async function fetchThreadMessages(threadId: string, onMessages: (message: Message[]) => void): Promise<void> {
    return fetchAllMessages({threadId}, onMessages)
}

export async function fetchResponse(threadId: string, runId: string): Promise<string> {
    const messages: Message[] = []
    const onMessages = (newMessages: Message[]) => messages.push(...newMessages)
    await fetchAllMessages({threadId, runId}, onMessages)
    return messages.map(m => m.content).join("\n\n")
}

type MessageQuery = {
    threadId: string
    runId?: string
    after?: string
}

async function fetchAllMessages({threadId, runId, after}: MessageQuery, onMessages: (messages: Message[]) => void): Promise<void> {
    const url = new URL(`${backendBaseUrl}/api/thread/${threadId}/message`)
    if (runId) {
        url.searchParams.set("runId", runId)
    }
    if (after) {
        url.searchParams.set("after", after)
    }
    const response = await fetch(url, {
        headers: sessionHeaders,
    })
    if (!response.ok) {
        throw Error(`fetching messages failed with status ${response.status}`)
    }
    const result = await response.json() as MessageResult
    const messages = result.messages.map(msg => {
        const streamingText = new StreamingText(...lineParsers)
        streamingText.push(msg.content)
        return {...msg, content: streamingText.finalize()}
    })
    if (messages.length > 0) {
        onMessages(messages)
    }
    if (result.hasMore && messages.length > 0) {
        await fetchAllMessages({threadId, runId, after: messages[messages.length - 1].id}, onMessages)
    }
}


//
// reference parsers
//

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

export const lineParsers: LineParser[] = [
    regexLineParser(suppressNativeReferenceParser),
    regexLineParser(referenceParser),
]
