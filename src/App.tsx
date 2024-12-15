import {Chat} from "./chat/Chat"
import {IntlProvider} from "react-intl"
import {getBrowserLocales, getMessages} from "./messages.ts"
import {Page} from "./page/Page.tsx"
import {MarkdownPage} from "./page/MarkdownPage.tsx"
import {BrowserRouter, Route, Routes} from "react-router"

const userLocales = getBrowserLocales()
const messages = getMessages(userLocales)

function App() {
    return (
        <IntlProvider messages={messages} locale={userLocales[0]}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Page><Chat/></Page>}/>
                    <Route path={"imprint"} element={<MarkdownPage contentName={"imprint"}/>}/>
                </Routes>
            </BrowserRouter>
        </IntlProvider>
    )
}

export default App
