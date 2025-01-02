import React from 'react';
import {PostEventSource} from "../util/event-source"
import {backendBaseUrl} from "../environment"
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"
import {ChatTextField} from "./ChatTextField.tsx"
import {regexLineParser, RegexLineParserSpec, StreamingText} from "./streaming-text.ts"
import {createReferenceMarkdownLink, Reference} from "./ReferenceLink.tsx"

const chatStyle = css`
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export function Chat() {
    const [answer, setAnswer] = React.useState('')
    const [messages, setMessages] = React.useState<ChatMessageProps[]>([])
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [threadId, setThreadId] = React.useState<string>()
    const [followUpQuestions, setFollowUpQuestions] = React.useState<string[]>([])

    const addMessage = (msgType: ChatMessageProps['msgType'], message: string) =>
        setMessages(prevMessages => prevMessages.concat({msgType, message}))

    const onSend = (question: string) => {
        addMessage("question", question)
        setIsError(false)
        setIsGenerating(true)
        setAnswer("")
        setFollowUpQuestions([])

        const onDone = (answer: string) => {
            addMessage("answer", answer)
            setAnswer("")
            setIsGenerating(false)
        }
        const onError = (answer: string) => {
            addMessage("answer", answer)
            setAnswer("")
            setIsError(true)
            setIsGenerating(false)
        }
        sendQuestion(question, threadId, setThreadId, setAnswer, setFollowUpQuestions, onDone, onError)
    }

    return (
        <div css={chatStyle}>
            {messages.length > 0 || answer || isGenerating
                ? <ChatHistory messages={messages} generatingAnswer={answer} isGenerating={isGenerating} isError={isError} />
                : null
            }
            {followUpQuestions.map((question, index) => <p key={index}>{question}</p>)}
            <ChatTextField onSend={onSend} />
        </div>
    )
}

function sendQuestion(
    message: string,
    threadId: string | undefined,
    setThreadId: (threadId: string | undefined) => void,
    updateAnswer: (answer: string) => void,
    updateFollowUpQuestions: (set: (pref: string[]) => string[]) => void,
    onDone: (answer: string) => void,
    onError: (answer: string) => void
) {
    const url = threadId ? `${backendBaseUrl}/api/thread/${threadId}` : `${backendBaseUrl}/api/thread`
    const eventSource = new PostEventSource(url, {body: message})
    const answer = new StreamingText(
        regexLineParser(referenceParser),
    )

    eventSource.onopen = (_, response) => {
        const threadId = response.headers.get("Thread-Id")
        setThreadId(threadId ?? undefined)
    }

    eventSource.onmessage = (event) => {
        const token = event.data
        if (event.type === "message") {
            updateAnswer(answer.push(token))
        } else if (event.type === "followUpQuestion") {
            updateFollowUpQuestions(prev => prev.concat(token))
        }
    }

    eventSource.ondone = () => onDone(answer.finalize())

    eventSource.onerror = (error) => {
        console.error(error)
        onError(answer.getText())
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