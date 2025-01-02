import Markdown, {Components} from "react-markdown"
import {css} from "@emotion/react"
import {color, dimensions} from "../style/styles.ts"
import {useIntl} from "react-intl"
import {EventualReferenceLink} from "./ReferenceLink.tsx"

const chatHistoryStyle = css`
    width: 100%;
    box-sizing: border-box;
    padding: 0 ${dimensions.pagePaddingHorizontal};
    flex-grow: 1;
    flex-direction: column;
    gap: 1rem;
    display: flex;
    overflow-y: auto;
`

export interface ChatHistoryProps {
    messages: ChatMessageProps[]
    generatingAnswer: string
    isError: boolean
}

export function ChatHistory({messages, generatingAnswer, isError}: ChatHistoryProps) {
    const intl = useIntl()
    return (
        <div css={chatHistoryStyle}>
            {messages.map((msg, index) => <ChatMessage key={index} {...msg} />)}
            {generatingAnswer ? <>
                <ChatMessage msgType={"answer"} message={generatingAnswer}/>
                <span>…</span>
            </> : null}
            {isError ? <ChatMessage msgType={"error"} message={intl.formatMessage({id: "chatError"})}/> : null}
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
}

function ChatMessage({msgType, message}: ChatMessageProps) {
    return (
        <Markdown
            css={msgStyle[msgType]}
            className={`message ${msgType}`}
            components={markdownComponents}
        >
            {message}
        </Markdown>
    )
}

const markdownComponents: Components = {
    a: ({href, target, children}) => <EventualReferenceLink href={href} target={target}>{children}</EventualReferenceLink>
}