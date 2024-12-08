import './App.css'
import {Chat} from "./Chat"
import {PageHeader} from "./page/PageHeader.tsx"
import {css} from "@emotion/react"
import {IntlProvider} from "react-intl"
import {getBrowserLocales, getMessages} from "./messages.ts"
import {PageFooter} from "./page/PageFooter.tsx"

const userLocales = getBrowserLocales()
const messages = getMessages(userLocales)

const appStyle = css`
    height: 100vh;
    box-sizing: border-box;
    padding: 16px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

function App() {
    return (
        <IntlProvider messages={messages} locale={userLocales[0]}>
            <div css={appStyle}>
                <PageHeader/>
                <Chat/>
                <PageFooter/>
            </div>
        </IntlProvider>
    )
}

export default App
