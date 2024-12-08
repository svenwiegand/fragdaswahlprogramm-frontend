import './App.css'
import {Chat} from "./Chat"
import {PageHeader} from "./page/PageHeader.tsx"
import {css} from "@emotion/react"
import {IntlProvider} from "react-intl"
import {getBrowserLocales, getMessages} from "./messages.ts"

const userLocales = getBrowserLocales()
const messages = getMessages(userLocales)

const appStyle = css`
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
            </div>
        </IntlProvider>
    )
}

export default App
