import React from 'react'
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"
import {ChatTextField} from "./ChatTextField.tsx"
import {Page} from "../page/Page.tsx"
import {Logo} from "./Logo.tsx"
import {Action} from "../page/PageHeader.tsx"
import NewChatIcon from "../icons/icon-new-chat.svg?react"
import {useIntl} from "react-intl"
import {GenerationStatus} from "./GeneratingIndicator.tsx"
import {InitialSuggestions} from "./InitialSuggestions.tsx"
import {CancelController, sendQuestion, ServerCommand} from "./send-question.ts"

const chatStyle = css`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
`

export function ChatPage() {
    const [threadId, setThreadId] = React.useState<string>()
    const [answer, setAnswer] = React.useState('')
    const [messages, setMessages] = React.useState<ChatMessageProps[]>([])
    const [generationStatus, setGenerationStatus] = React.useState<GenerationStatus>("idle")
    const [suggestions, setSuggestions] = React.useState<string[]>([])
    const [showPartySelector, setShowPartySelector] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const cancelControllerRef = React.useRef<CancelController>()
    const addMessage = (msgType: ChatMessageProps['msgType'], message: string) =>
        setMessages(prevMessages => prevMessages.concat({msgType, message}))

    const send = (question: string, hideQuestion: boolean) => {
        if (!hideQuestion) {
            addMessage("question", question)
        }
        setIsError(false)
        setGenerationStatus("thinking")
        setAnswer("")
        setSuggestions([])
        setShowPartySelector(false)

        const onCommand = (command: ServerCommand) => {
            if (command === "selectParties") {
                setShowPartySelector(true)
            }
        }
        const onDone = (answer: string) => {
            addMessage("answer", answer)
            setAnswer("")
            setGenerationStatus("idle")
        }
        const onError = () => {
            setAnswer("")
            setIsError(true)
            setGenerationStatus("idle")
        }
        sendQuestion(question, threadId, setThreadId, setGenerationStatus, setAnswer, setSuggestions, onCommand, onDone, onError, cancelControllerRef)
            .then(() => console.log("Finished receiving response"))
    }
    const simpleSend = (question: string) => send(question, false)

    const reset = () => {
        cancelControllerRef.current?.cancel()
        setMessages([])
        setThreadId(undefined)
        setAnswer("")
        setGenerationStatus("idle")
        setIsError(false)
        setSuggestions([])
    }

    const intl = useIntl()
    const newChatAction: Action = {
        icon:  NewChatIcon,
        title: intl.formatMessage({id: "chatNew"}),
        onClick: reset
    }
    const hasChat = messages.length > 0 || !!answer || generationStatus !== "idle"

    return (
        <Page isSubPage={hasChat} onBack={reset} headerAction={newChatAction} hideFooter={hasChat}>
            <div css={chatStyle}>
                {!hasChat && <Logo/>}
                {hasChat &&
                    <ChatHistory
                        messages={messages}
                        generationStatus={generationStatus}
                        generatingAnswer={answer}
                        isError={isError}
                        showPartySelector={showPartySelector}
                        suggestions={suggestions}
                        sendQuestion={send}
                    />
                }
                <ChatTextField fixed={hasChat} onSend={simpleSend} />
                {!hasChat && <>
                    <InitialSuggestions onClick={simpleSend}/>
                </>}
            </div>
        </Page>
    )
}
