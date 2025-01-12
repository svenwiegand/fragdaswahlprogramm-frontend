import React from 'react'
import {PostEventSource} from "../util/event-source"
import {backendBaseUrl} from "../environment"
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"
import {ChatTextField} from "./ChatTextField.tsx"
import {LineParser, regexLineParser, RegexLineParserSpec, StreamingText} from "./streaming-text.ts"
import {createReferenceMarkdownLink, Reference} from "./reference-link.ts"
import {Page} from "../page/Page.tsx"
import {Logo} from "./Logo.tsx"
import {Action} from "../page/PageHeader.tsx"
import NewChatIcon from "../icons/icon-new-chat.svg?react"
import {useIntl} from "react-intl"
import {sessionHeaders} from "../common/track.ts"
import {GenerationStatus} from "./GeneratingIndicator.tsx"
import {InitialSuggestions} from "./InitialSuggestions.tsx"
import {useElementHeight} from "../common/react-utils.ts"

type Command = "selectParties"

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
    const [inputFieldRef, inputFieldHeight] = useElementHeight<HTMLDivElement>()
    const additionalChatStyle = css`
        padding-bottom: ${inputFieldHeight}px;
    `

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

        const onCommand = (command: Command) => {
            if (command === "selectParties") {
                setShowPartySelector(true)
            }
        }
        const onDone = (answer: string) => {
            addMessage("answer", answer)
            setAnswer("")
            setGenerationStatus("idle")
        }
        const onError = (answer: string) => {
            addMessage("answer", answer)
            setAnswer("")
            setIsError(true)
            setGenerationStatus("idle")
        }
        sendQuestion(question, threadId, setThreadId, setGenerationStatus, setAnswer, setSuggestions, onCommand, onDone, onError)
    }
    const simpleSend = (question: string) => send(question, false)

    const reset = () => {
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
            <div css={[chatStyle, additionalChatStyle]}>
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
                <ChatTextField fixed={hasChat} onSend={simpleSend} ref={inputFieldRef} />
                {!hasChat && <>
                    <InitialSuggestions onClick={simpleSend}/>
                </>}
            </div>
        </Page>
    )
}

function sendQuestion(
    message: string,
    threadId: string | undefined,
    setThreadId: (threadId: string | undefined) => void,
    updateStatus: (status: GenerationStatus) => void,
    updateAnswer: (answer: string) => void,
    updateSuggestions: (set: (pref: string[]) => string[]) => void,
    onCommand: (command: Command) => void,
    onDone: (answer: string) => void,
    onError: (answer: string) => void
) {
    const url = threadId ? `${backendBaseUrl}/api/thread/${threadId}` : `${backendBaseUrl}/api/thread`
    const eventSource = new PostEventSource(url, {body: message, headers: sessionHeaders})
    const answer = new StreamingText(...lineParsers)

    eventSource.onopen = (_, response) => {
        const threadId = response.headers.get("Thread-Id")
        setThreadId(threadId ?? undefined)
    }

    eventSource.onmessage = (event) => {
        const token = event.data
        if (event.type === "message") {
            updateStatus("generating")
            updateAnswer(answer.push(token))
        } else if (event.type === "command") {
            onCommand(token as Command)
        } else if (event.type === "followUpQuestion") {
            updateSuggestions(prev => {
                const suggestions = [...prev, token]
                return Array.from(new Set(suggestions))
            })
        } else if (event.type === "status") {
            updateStatus(token)
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

const suppressNativeReferenceParser: RegexLineParserSpec = {
    regex: /【([^】]+)】/g,
    replacer: () => ""
}

const lineParsers: LineParser[] = [
    regexLineParser(suppressNativeReferenceParser),
    regexLineParser(referenceParser),
]