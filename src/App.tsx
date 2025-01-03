import {ChatPage} from "./chat/ChatPage.tsx"
import {IntlProvider} from "react-intl"
import {getBrowserLocales, getMessages} from "./messages.ts"
import {MarkdownPage} from "./page/MarkdownPage.tsx"
import {BrowserRouter, Route, Routes} from "react-router"

const userLocales = getBrowserLocales()
const messages = getMessages(userLocales)

function App() {
    return (
        <IntlProvider messages={messages} locale={"de-de"}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<ChatPage/>}/>
                    <Route path={"about"} element={<MarkdownPage contentName={"about"}/>}/>
                    <Route path={"parties"} element={<MarkdownPage contentName={"parties"}/>}/>
                    <Route path={"imprint"} element={<MarkdownPage contentName={"imprint"}/>}/>
                    <Route path={"privacy"} element={<MarkdownPage contentName={"privacy"}/>}/>
                </Routes>
            </BrowserRouter>
        </IntlProvider>
    )
}

export default App
