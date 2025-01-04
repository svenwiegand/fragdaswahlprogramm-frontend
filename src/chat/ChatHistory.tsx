import Markdown, {Components} from "react-markdown"
import {css} from "@emotion/react"
import {color, dimensions, rempx, responsiveHPadding} from "../style/styles.ts"
import {useIntl} from "react-intl"
import {EventualReferenceLink} from "./ReferenceLink.tsx"
import {GeneratingIndicator} from "./GeneratingIndicator.tsx"
import {useCallback, useEffect, useRef} from "react"
import {Suggestions} from "./Suggestion.tsx"
import {PartySelector} from "./PartySelector.tsx"
import {Party, parties} from "../common/parties.ts"

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
    margin: 0 auto 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export interface ChatHistoryProps {
    messages: ChatMessageProps[]
    generatingAnswer: string
    isGenerating: boolean
    isError: boolean
    showPartySelector: boolean
    suggestions: string[]
    sendQuestion: (question: string, hideQuestion: boolean) => void
}

export function ChatHistory(
    {messages, generatingAnswer, isGenerating, isError, showPartySelector, suggestions, sendQuestion}: ChatHistoryProps
) {
    const intl = useIntl()
    const indicatorRef = useRef<HTMLDivElement>(null)
    const send = useCallback((question: string) => sendQuestion(question, false), [sendQuestion])
    const onPartiesSelected = useCallback((selectedParties: Party[]) => {
        sendQuestion(`${selectedParties.map(p => parties[p].name).join(", ")}`, true)
    }, [sendQuestion])

    useEffect(() => {
        if (isGenerating && indicatorRef.current) {
            indicatorRef.current.scrollIntoView({block: "start", behavior: "smooth"})
        }
    }, [isGenerating, generatingAnswer])

    return (
        <div css={chatHistoryStyle}>
            <div css={chatHistoryContentStyle}>
                {messages.map((msg, index) => <ChatMessage key={index} {...msg} />)}
                {showPartySelector && !isGenerating ? <PartySelector onSelect={onPartiesSelected}/> : null}
                {generatingAnswer ? <>
                    <ChatMessage msgType={"answer"} message={generatingAnswer} isGenerating={true}/>
                </> : null}
                {isGenerating ? <GeneratingIndicator alreadyReceivedText={!!generatingAnswer} ref={indicatorRef}/> : null}
                {isError ? <ChatMessage msgType={"error"} message={intl.formatMessage({id: "chatError"})}/> : null}
                {suggestions.length > 0 && !isGenerating
                    ? <Suggestions suggestions={suggestions} onClick={send}/>
                    : null
                }
            </div>
        </div>
    )
}

const chatMessageStyle = css`
    line-height: ${rempx(28)}
`

const questionStyle = css`
    ${chatMessageStyle};
    max-width: 70%;
    margin-left: auto;
    padding: ${rempx(10)} ${rempx(20)};
    border-radius: ${rempx(24)};
    background-color: ${color.neutral.neutral200};
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