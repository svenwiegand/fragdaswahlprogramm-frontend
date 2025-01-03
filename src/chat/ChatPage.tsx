import React from 'react'
import {PostEventSource} from "../util/event-source"
import {backendBaseUrl} from "../environment"
import {css} from "@emotion/react"
import {ChatHistory, ChatMessageProps} from "./ChatHistory.tsx"
import {ChatTextField} from "./ChatTextField.tsx"
import {regexLineParser, RegexLineParserSpec, StreamingText} from "./streaming-text.ts"
import {createReferenceMarkdownLink, Reference} from "./ReferenceLink.tsx"
import {Page} from "../page/Page.tsx"
import {FlexSpacer} from "../common/Spacer.tsx"
import {Logo} from "./Logo.tsx"
import {Action} from "../page/PageHeader.tsx"
import NewChatIcon from "../icons/icon-new-chat.svg?react"
import {useIntl} from "react-intl"

const chatStyle = css`
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export function ChatPage() {
    const [answer, setAnswer] = React.useState('')
    const [messages, setMessages] = React.useState<ChatMessageProps[]>([])
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [threadId, setThreadId] = React.useState<string>()
    const [suggestions, setSuggestions] = React.useState<string[]>([])

    const addMessage = (msgType: ChatMessageProps['msgType'], message: string) =>
        setMessages(prevMessages => prevMessages.concat({msgType, message}))

    const onSend = (question: string) => {
        addMessage("question", question)
        setIsError(false)
        setIsGenerating(true)
        setAnswer("")
        setSuggestions([])

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
        sendQuestion(question, threadId, setThreadId, setAnswer, setSuggestions, onDone, onError)
    }

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
                        suggestions={suggestions}
                        onSuggestionClick={onSend}
                    />
                    : null
                }
                <ChatTextField expanded={hasChat} onSend={onSend} />
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
            updateSuggestions(prev => prev.concat(token))
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