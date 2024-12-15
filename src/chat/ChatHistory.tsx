import Markdown from "react-markdown"
import {css} from "@emotion/react"
import {dimensions} from "../style/styles.ts"

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
}

export function ChatHistory({messages, generatingAnswer}: ChatHistoryProps) {
    return (
        <div css={chatHistoryStyle}>
            {messages.map((msg, index) => <ChatMessage key={index} {...msg} />)}
            {generatingAnswer ? <>
                <ChatMessage msgType={"answer"} message={generatingAnswer}/>
                <span>…</span>
            </> : null}
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

export interface ChatMessageProps {
    msgType: "question" | "answer"
    message: string
}

function ChatMessage({msgType, message}: ChatMessageProps) {
    const style = msgType === "question" ? questionStyle : answerStyle
    return <Markdown css={style} className={`message ${msgType}`}>{message}</Markdown>
}