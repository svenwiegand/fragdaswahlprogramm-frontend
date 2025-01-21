import React, {useCallback, useEffect, useRef, useState} from 'react'
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"
import {ChatTextField} from "./ChatTextField.tsx"
import {Page} from "../page/Page.tsx"
import {Action} from "../page/PageHeader.tsx"
import NewChatIcon from "../icons/icon-new-chat.svg?react"
import {useIntl} from "react-intl"
import {GenerationStatus} from "./GeneratingIndicator.tsx"
import {CancelController, sendQuestion, ServerCommand} from "./send-question.ts"
import {NavigateFunction, useNavigate, useParams, useSearchParams} from "react-router"
import {fetchThreadMessages, Message} from "./load-messages.ts"
import {useElementHeight} from "../common/react-utils.ts"

const chatStyle = css`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
`

export function ChatPage() {
    const navigate = useNavigate()
    const {threadId: threadIdParam} = useParams<{ threadId?: string }>()
    const [queryParams] = useSearchParams()
    const questionParam = queryParams.get("question")
    const [messages, setMessages] = useState<ChatMessageProps[]>([])

    const {setThreadId, send, reset, generationStatus, answer, maxNumberOfPartiesToSelect, suggestions, isError} = useChatSender(
        threadIdParam,
        setMessages,
        navigate
    )
    useChatLoader(threadIdParam, questionParam, send, setMessages, setThreadId)

    const intl = useIntl()
    const newChatAction: Action = {
        icon: NewChatIcon,
        title: intl.formatMessage({id: "chatNew"}),
        onClick: () => {
            reset()
            navigate("/")
        },
    }

    const [textFieldRef, textFieldHeight] = useElementHeight<HTMLDivElement>()
    const advancedChatStyle = css`
        ${chatStyle};
        margin-bottom: ${textFieldHeight}px;
    `

    const hasChat = messages.length > 0 || !!answer || generationStatus !== "idle"

    return (
        <Page isSubPage={true} onBack={reset} headerAction={newChatAction} hideFooter={true}>
            <div css={advancedChatStyle}>
                {hasChat && (
                    <ChatHistory
                        messages={messages}
                        generationStatus={generationStatus}
                        generatingAnswer={answer}
                        isError={isError}
                        maxNumberOfPartiesToSelect={maxNumberOfPartiesToSelect}
                        suggestions={suggestions}
                        sendQuestion={send}
                    />
                )}
                <ChatTextField fixed={true} onSend={send} ref={textFieldRef} />
            </div>
        </Page>
    )
}

function useChatLoader(
    threadIdParam: string | undefined,
    questionParam: string | undefined | null,
    sendQuestion: (q: string) => void,
    setMessages: React.Dispatch<React.SetStateAction<ChatMessageProps[]>>,
    setThreadId: React.Dispatch<React.SetStateAction<string | undefined>>
) {
    const hasTriggeredLoad = useRef(false)

    useEffect(() => {
        if (!hasTriggeredLoad.current) {
            hasTriggeredLoad.current = true
            if (threadIdParam) {
                console.log(`Loading messages for thread ${threadIdParam}`)
                setThreadId(threadIdParam)
                const onMessages = (messages: Message[]) => {
                    setMessages(prev => [...prev, ...messages.map(msg => ({
                        msgType: msg.type,
                        message: msg.content,
                    }))])
                }
                fetchThreadMessages(threadIdParam, onMessages)
                    .then(() => console.log("Finished fetching messages"))
            } else if (questionParam && sendQuestion) {
                sendQuestion(questionParam)
            }
        }
    }, [threadIdParam, questionParam, sendQuestion, setMessages, setThreadId])
}

function useChatSender(
    initialThreadId: string | undefined,
    setMessages: React.Dispatch<React.SetStateAction<ChatMessageProps[]>>,
    navigate: NavigateFunction
) {
    const [threadId, setThreadId] = useState(initialThreadId)
    const [generationStatus, setGenerationStatus] = useState<GenerationStatus>("idle")
    const [answer, setAnswer] = useState("")
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isError, setIsError] = useState(false)
    const [numberOfPartiesToSelect, setNumberOfPartiesToSelect] = useState(0)
    const cancelControllerRef = useRef<CancelController>()

    const addMessage = useCallback((msgType: ChatMessageProps["msgType"], message: string) => {
        setMessages(prev => [...prev, {msgType, message}])
    }, [setMessages])
    const onThreadIdChange = useCallback((newThreadId: string | undefined) => {
        setThreadId(newThreadId)
        if (newThreadId) {
            navigate(`/chat/${newThreadId}`, {replace: true})
        } else {
            navigate(`/chat`)
        }
    }, [navigate])
    const onCommand = (command: ServerCommand) => {
        const selectPartiesMatch = command.match(/selectParties\((\d+)\)/)
        if (selectPartiesMatch) {
            setNumberOfPartiesToSelect(Number(selectPartiesMatch[1]))
        }
    }
    const onDone = useCallback((answer: string) => {
        addMessage("answer", answer)
        setAnswer("")
        setGenerationStatus("idle")
    }, [addMessage])
    const onError = useCallback(() => {
        setAnswer("")
        setGenerationStatus("idle")
        setIsError(true)
    }, [])

    const send = useCallback(
        (question: string) => {
            addMessage("question", question)
            setGenerationStatus("thinking")
            setNumberOfPartiesToSelect(0)
            setAnswer("")
            setSuggestions([])
            setIsError(false)

            sendQuestion(
                question,
                threadId,
                onThreadIdChange,
                setGenerationStatus,
                setAnswer,
                setSuggestions,
                onCommand,
                onDone,
                onError,
                cancelControllerRef,
            )
        },
        [addMessage, threadId, onThreadIdChange, onDone, onError],
    )

    const reset = () => {
        cancelControllerRef.current?.cancel()
        setMessages([])
        onThreadIdChange(undefined)
        setAnswer("")
        setGenerationStatus("idle")
        setNumberOfPartiesToSelect(0)
        setSuggestions([])
        setIsError(false)
    }

    return {setThreadId, send, reset, generationStatus, answer, maxNumberOfPartiesToSelect: numberOfPartiesToSelect, suggestions, isError}
}
