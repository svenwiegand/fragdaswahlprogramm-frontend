import React from 'react';
import {PostEventSource} from "./event-source"
import {backendBaseUrl} from "./environment"

export function Chat() {
    const [message, setMessage] = React.useState('')
    const [answer, setAnswer] = React.useState('')
    const [done, setDone] = React.useState(false)

    const sendMessage = () => {
        const eventSource = new PostEventSource(`${backendBaseUrl}/api/message`, {body: message})
        setMessage("")
        setDone(false)
        eventSource.ondone = () => setDone(true)

        let msg = ""
        eventSource.onmessage = (event) => {
            const token = event.data
            msg = msg + token
            setAnswer(msg)
        }

        eventSource.onerror = () => {
            eventSource.close()
            //onAnswerCompleted(msg)
        }

    }

    return (
        <div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Senden</button>
            <div>{answer}</div>
            <div>{done ? "fertig!" : "generiere Antwort…"}</div>
        </div>
    )
}