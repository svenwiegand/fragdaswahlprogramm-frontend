export class PostEventSource {
    private reader: ReadableStreamDefaultReader<Uint8Array> | null = null
    private decoder = new TextDecoder()
    private buffer = ''
    private prevLineWasDataLine = false
    private controller = new AbortController()
    public onmessage: ((event: MessageEvent) => void) | null = null
    public ondone: (() => void) | null = null
    public onerror: ((event: Event) => void) | null = null
    public onopen: ((event: Event) => void) | null = null
    public readyState: number = 0

    constructor(url: string, init?: RequestInit) {
        this.init(url, init)
    }

    private async init(url: string, init?: RequestInit) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                ...init,
                signal: this.controller.signal,
            })

            if (!response.ok) {
                throw new Error(`HTTP-Fehler! Status: ${response.status}`)
            }

            if (this.onopen) {
                this.onopen(new Event('open'))
            }

            if (!response.body) {
                throw new Error('Ihr Browser unterstützt keine Streams in der fetch API.')
            }

            this.reader = response.body.getReader()
            this.readyState = 1 // OPEN
            await this.readStream()
            console.log("DONE!")
            if (this.ondone) {
                this.ondone()
            }
            this.readyState = 2 // CLOSED
        } catch (error) {
            this.readyState = 2 // CLOSED
            if (this.onerror) {
                this.onerror(error as Event)
            } else {
                console.error('Fehler:', error)
            }
        }
    }

    private async readStream() {
        if (!this.reader) return
        try {
            while (true) {
                const {done, value} = await this.reader.read()
                if (done) {
                    break
                }
                this.buffer += this.decoder.decode(value, {stream: true})
                let lines = this.buffer.split('\n')
                this.buffer = lines.pop()! // Behalte das letzte unvollständige Zeilenfragment

                let eventData = ''
                for (const line of lines) {
                    console.log(`"${line}"`)
                    if (line.startsWith('data: ')) {
                        if (this.prevLineWasDataLine) {
                            eventData += "\n"
                        }
                        eventData += line.substring(6)
                        this.prevLineWasDataLine = true
                    } else if (line === '') {
                        // Leere Zeile signalisiert das Ende eines Events
                        if (this.onmessage) {
                            this.onmessage({data: eventData} as MessageEvent)
                        }
                        this.prevLineWasDataLine = false
                        eventData = ''
                    }
                }
            }
        } catch (error) {
            if (this.onerror) {
                this.onerror(error as Event)
            }
        }
    }

    close() {
        this.controller.abort()
        if (this.reader) {
            this.reader.cancel()
        }
        this.readyState = 2 // CLOSED
    }
}
