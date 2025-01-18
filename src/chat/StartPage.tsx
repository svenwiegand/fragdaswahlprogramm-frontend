import {css} from "@emotion/react"
import {ChatTextField} from "./ChatTextField.tsx"
import {Page} from "../page/Page.tsx"
import {Logo} from "./Logo.tsx"
import {InitialSuggestions} from "./InitialSuggestions.tsx"
import {useNavigate} from "react-router"

const chatStyle = css`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
`

export function StartPage() {
    const navigate = useNavigate()
    const sendQuestion = (question: string) => {
        navigate(`/chat?question=${encodeURIComponent(question)}`)
    }

    return (
        <Page>
            <div css={chatStyle}>
                <Logo/>
                <ChatTextField onSend={sendQuestion} />
                <InitialSuggestions onClick={sendQuestion}/>
            </div>
        </Page>
    )
}
