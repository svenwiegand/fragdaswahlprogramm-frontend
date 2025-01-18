import {useCallback, useEffect, useRef, useState} from 'react'
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"
import {ChatTextField} from "./ChatTextField.tsx"
import {Page} from "../page/Page.tsx"
import {Action} from "../page/PageHeader.tsx"
import NewChatIcon from "../icons/icon-new-chat.svg?react"
import {useIntl} from "react-intl"
import {GenerationStatus} from "./GeneratingIndicator.tsx"
import {CancelController, sendQuestion, ServerCommand} from "./send-question.ts"
import {useNavigate, useParams, useSearchParams} from "react-router"
import {fetchThreadMessages, Message} from "./load-messages.ts"

const chatStyle = css`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
`

type PageParams = {
    threadId?: string
}

export function ChatPage() {
    const navigate = useNavigate()
    const {threadId: threadIdParam} = useParams<PageParams>()
    const [queryParams] = useSearchParams()
    const questionParam = queryParams.get("question")
    const [threadId, setThreadId] = useState<string | undefined>(threadIdParam)
    const onThreadId = useCallback((threadId: string | undefined) => {
        setThreadId(threadId)
        navigate(`/chat/${threadId}`, {replace: true})
    }, [navigate])

    const [messages, setMessages] = useState<ChatMessageProps[]>([])
    const send = useCallback((question: string) => {
        addMessage("question", question)
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
        sendQuestion(question, threadId, onThreadId, setGenerationStatus, setAnswer, setSuggestions, onCommand, onDone, onError, cancelControllerRef)
            .then(() => console.log("Finished receiving response"))
    }, [onThreadId, threadId])

    const [answer, setAnswer] = useState('')
    const [generationStatus, setGenerationStatus] = useState<GenerationStatus>("idle")
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showPartySelector, setShowPartySelector] = useState(false)
    const [isError, setIsError] = useState(false)
    const cancelControllerRef = useRef<CancelController>()
    const addMessage = (msgType: ChatMessageProps['msgType'], message: string) =>
        setMessages(prevMessages => prevMessages.concat({msgType, message}))


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

    // Initially load either the answer to a question or a whole thread
    const hasTriggeredLoad = useRef(false)
    useEffect(() => {
        if (!hasTriggeredLoad.current) {
            hasTriggeredLoad.current = true
            if (threadIdParam) {
                console.log(`Loading thread ${threadIdParam}`)
                setThreadId(threadIdParam)
                const onMessages = (messages: Message[]) => {
                    setMessages(prev => [...prev, ...messages.map(msg => ({
                        msgType: msg.type,
                        message: msg.content,
                    }))])
                }
                fetchThreadMessages(threadIdParam, onMessages).then(() => console.log("Finished fetching messages"))
            } else if (questionParam) {
                send(questionParam)
            }
        }
    }, [])

    return (
        <Page isSubPage={true} onBack={reset} headerAction={newChatAction} hideFooter={true}>
            <div css={chatStyle}>
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
                <ChatTextField fixed={true} onSend={send} />
            </div>
        </Page>
    )
}