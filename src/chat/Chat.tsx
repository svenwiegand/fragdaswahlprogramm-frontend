import React from 'react';
import {PostEventSource} from "../util/event-source"
import {backendBaseUrl} from "../environment"
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"
import {ChatTextField} from "./ChatTextField.tsx"

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
    const [threadId, setThreadId] = React.useState<string>()

    const addMessage = (msgType: ChatMessageProps['msgType'], message: string) =>
        setMessages(prevMessages => prevMessages.concat({msgType, message}))

    const onSend = (question: string) => {
        addMessage("question", question)
        setAnswer("")

        const onDone = (answer: string) => {
            addMessage("answer", answer)
            setAnswer("")
        }
        sendQuestion(question, threadId, setThreadId, setAnswer, onDone)
    }

    return (
        <div css={chatStyle}>
            {messages.length > 0 || answer ? <ChatHistory messages={messages} generatingAnswer={answer} /> : null}

            <ChatTextField onSend={onSend} />
        </div>
    )
}

function sendQuestion(
    message: string,
    threadId: string | undefined,
    setThreadId: (threadId: string | undefined) => void,
    updateAnswer: (answer: string) => void,
    onDone: (answer: string) => void
) {
    const url = threadId ? `${backendBaseUrl}/api/thread/${threadId}` : `${backendBaseUrl}/api/thread`
    const eventSource = new PostEventSource(url, {body: message})
    let answer = ""

    eventSource.onopen = (_, response) => {
        const threadId = response.headers.get("Thread-Id")
        setThreadId(threadId ?? undefined)
    }

    eventSource.onmessage = (event) => {
        const token = event.data
        answer = answer + token
        updateAnswer(answer)
    }

    eventSource.ondone = () => onDone(answer)

    eventSource.onerror = () => {
        eventSource.close()
        onDone(answer)
    }
}