import React from 'react'
import {PostEventSource} from "../util/event-source"
import {backendBaseUrl} from "../environment"
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"
import {ChatTextField} from "./ChatTextField.tsx"
import {LineParser, regexLineParser, RegexLineParserSpec, StreamingText} from "./streaming-text.ts"
import {createReferenceMarkdownLink, Reference} from "./reference-link.ts"
import {Page} from "../page/Page.tsx"
import {FlexSpacer} from "../common/Spacer.tsx"
import {Logo} from "./Logo.tsx"
import {Action} from "../page/PageHeader.tsx"
import NewChatIcon from "../icons/icon-new-chat.svg?react"
import {useIntl} from "react-intl"
import {sessionHeaders} from "../common/track.ts"

type Command = "selectParties"

const chatStyle = css`
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export function ChatPage() {
    const [threadId, setThreadId] = React.useState<string>()
    const [answer, setAnswer] = React.useState('')
    const [messages, setMessages] = React.useState<ChatMessageProps[]>([])
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [suggestions, setSuggestions] = React.useState<string[]>([])
    const [showPartySelector, setShowPartySelector] = React.useState(false)
    const [isError, setIsError] = React.useState(false)

    const addMessage = (msgType: ChatMessageProps['msgType'], message: string) =>
        setMessages(prevMessages => prevMessages.concat({msgType, message}))

    const send = (question: string, hideQuestion: boolean) => {
        if (!hideQuestion) {
            addMessage("question", question)
        }
        setIsError(false)
        setIsGenerating(true)
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
            setIsGenerating(false)
        }
        const onError = (answer: string) => {
            addMessage("answer", answer)
            setAnswer("")
            setIsError(true)
            setIsGenerating(false)
        }
        sendQuestion(question, threadId, setThreadId, setAnswer, setSuggestions, onCommand, onDone, onError)
    }
    const simpleSend = (question: string) => send(question, false)

    const reset = () => {
        setMessages([])
        setThreadId(undefined)
        setAnswer("")
        setIsGenerating(false)
        setIsError(false)
        setSuggestions([])
    }

    const intl = useIntl()
    const newChatAction: Action = {
        icon:  NewChatIcon,
        title: intl.formatMessage({id: "chatNew"}),
        onClick: reset
    }
    const hasChat = messages.length > 0 || !!answer || isGenerating

    return (
        <Page isSubPage={hasChat} onBack={reset} headerAction={newChatAction} hideFooter={hasChat}>
            <div css={chatStyle}>
                {!hasChat ? <><FlexSpacer grow={1} portraitGrow={1}/><Logo/></> : null}
                {hasChat
                    ? <ChatHistory
                        messages={messages}
                        generatingAnswer={answer}
                        isGenerating={isGenerating}
                        isError={isError}
                        showPartySelector={showPartySelector}
                        suggestions={suggestions}
                        sendQuestion={send}
                    />
                    : null
                }
                <ChatTextField expanded={hasChat} onSend={simpleSend} />
                {!hasChat ? <FlexSpacer grow={4}/> : null}
            </div>
        </Page>
    )
}

function sendQuestion(
    message: string,
    threadId: string | undefined,
    setThreadId: (threadId: string | undefined) => void,
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
            updateAnswer(answer.push(token))
        } else if (event.type === "command") {
            onCommand(token as Command)
        } else if (event.type === "followUpQuestion") {
            updateSuggestions(prev => {
                const suggestions = [...prev, token]
                return Array.from(new Set(suggestions))
            })
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