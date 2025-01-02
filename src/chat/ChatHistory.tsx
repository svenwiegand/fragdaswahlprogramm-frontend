import Markdown, {Components} from "react-markdown"
import {css} from "@emotion/react"
import {color, dimensions, responsiveHPadding} from "../style/styles.ts"
import {useIntl} from "react-intl"
import {EventualReferenceLink} from "./ReferenceLink.tsx"
import {GeneratingIndicator} from "./GeneratingIndicator.tsx"

const chatHistoryStyle = css`
    width: 100%;
    box-sizing: border-box;
    flex-grow: 1;
    overflow-y: auto;
    ${responsiveHPadding}
`

const chatHistoryContentStyle = css`
    width: 100%;
    max-width: ${dimensions.maxContentWidth};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export interface ChatHistoryProps {
    messages: ChatMessageProps[]
    generatingAnswer: string
    isGenerating: boolean
    isError: boolean
}

export function ChatHistory({messages, generatingAnswer, isGenerating, isError}: ChatHistoryProps) {
    const intl = useIntl()
    return (
        <div css={chatHistoryStyle}>
            <div css={chatHistoryContentStyle}>
                {messages.map((msg, index) => <ChatMessage key={index} {...msg} />)}
                {generatingAnswer ? <>
                    <ChatMessage msgType={"answer"} message={generatingAnswer} isGenerating={true}/>
                </> : null}
                {isGenerating ? <GeneratingIndicator alreadyReceivedText={!!generatingAnswer}/> : null}
                {isError ? <ChatMessage msgType={"error"} message={intl.formatMessage({id: "chatError"})}/> : null}
            </div>
        </div>
    )
}

const chatMessageStyle = css`
`

const questionStyle = css`
    ${chatMessageStyle};
    max-width: 70%;
    margin-left: auto;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #eee;
`

const answerStyle = css`
    ${chatMessageStyle};
`

const errorStyle = css`
    ${questionStyle};
    background-color: ${color.error.background};
    color: ${color.error.text};
`

const msgStyle: Record<ChatMessageProps['msgType'], ReturnType<typeof css>> = {
    question: questionStyle,
    answer: answerStyle,
    error: errorStyle,
}

export interface ChatMessageProps {
    msgType: "question" | "answer" | "error"
    message: string
    isGenerating?: boolean
}

function ChatMessage({msgType, message, isGenerating}: ChatMessageProps) {
    return (
        <Markdown
            css={msgStyle[msgType]}
            className={`message ${msgType} ${isGenerating ? "generating" : ""}`}
            components={markdownComponents}
        >
            {message}
        </Markdown>
    )
}

const markdownComponents: Components = {
    a: ({href, target, children}) => <EventualReferenceLink href={href} target={target}>{children}</EventualReferenceLink>
}