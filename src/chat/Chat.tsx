import React from 'react';
import {PostEventSource} from "../util/event-source"
import {backendBaseUrl} from "../environment"
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"

const chatStyle = css`
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export function Chat() {
    const [question, setQuestion] = React.useState('')
    const [answer, setAnswer] = React.useState('')
    const [messages, setMessages] = React.useState<ChatMessageProps[]>([])

    const addMessage = (msgType: ChatMessageProps['msgType'], message: string) =>
        setMessages(prevMessages => prevMessages.concat({msgType, message}))

    const send = () => {
        addMessage("question", question)
        setAnswer("")

        const onDone = (answer: string) => {
            addMessage("answer", answer)
            setAnswer("")
        }
        sendQuestion(question, setAnswer, onDone)
        setQuestion("")
    }

    return (
        <div css={chatStyle}>
            {messages.length > 0 || answer ? <ChatHistory messages={messages} generatingAnswer={answer} /> : null}

            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
            <button onClick={send}>Senden</button>
        </div>
    )
}

function sendQuestion(message: string, updateAnswer: (answer: string) => void, onDone: (answer: string) => void) {
    const eventSource = new PostEventSource(`${backendBaseUrl}/api/message`, {body: message})
    let answer = ""

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