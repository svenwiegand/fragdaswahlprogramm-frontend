import {ChatPage} from "./chat/ChatPage.tsx"
import {IntlProvider} from "react-intl"
import {getBrowserLocales, getMessages} from "./messages.ts"
import {MarkdownPage} from "./page/MarkdownPage.tsx"
import {BrowserRouter, Route, Routes, useLocation} from "react-router"
import {useEffect, useState} from "react"
import {trackHello, trackPage} from "./common/track.ts"

const userLocales = getBrowserLocales()
const messages = getMessages(userLocales)

function App() {
    const [trackedHello, setTrackedHello] = useState(false)
    useEffect(() => {
        if (!trackedHello) {
            trackHello()
            setTrackedHello(true)
        }
    }, [])

    return (
        <IntlProvider messages={messages} locale={"de-de"}>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </IntlProvider>
    )
}

function AppRoutes() {
    const [lastPath, setLastPath] = useState<string>("/")
    const location = useLocation()
    useEffect(() => {
        const path = location.pathname
        if (path !== lastPath) {
            setLastPath(path)
            if (path !== "/") {
                trackPage(path)
            }
        }
    }, [location])

    return (
        <Routes>
            <Route index element={<ChatPage/>}/>
            <Route path={"about"} element={<MarkdownPage contentName={"about"}/>}/>
            <Route path={"parties"} element={<MarkdownPage contentName={"parties"}/>}/>
            <Route path={"imprint"} element={<MarkdownPage contentName={"imprint"}/>}/>
            <Route path={"privacy"} element={<MarkdownPage contentName={"privacy"}/>}/>
        </Routes>
    )
}

export default App
