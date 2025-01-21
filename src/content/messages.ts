import {MessageFormatElement} from "@formatjs/icu-messageformat-parser"

const languages = ["de", "en"]
const defaultLanguage = "en"

type MessagesById = Record<string, string> | Record<string, MessageFormatElement[]>

export function getMessages(locales: readonly string[]): MessagesById {
    const langCodes = locales.map(locale => locale.split("-")[0])
    const langCode = langCodes.find(lang => languages.includes(lang)) ?? defaultLanguage
    return messages[langCode]
}

export function getBrowserLocales(): readonly string[] {
    return navigator.languages
}

const messages: Record<string, MessagesById> = {
    de: {
        home: "Startseite",
        about: "Über „fragdaswahlprogramm”",
        qna: "Fragen & Antworten",
        qnaShort: "Q&A",
        parties: "Parteien",
        imprint: "Impressum",
        privacy: "Datenschutz",

        inputPlaceholder: "Deine Frage an die Wahlprogramme",
        send: "Senden",

        chatGenerating: "Einen Moment bitte…",
        chatSearching: "Ich durchsuche die Wahlprogramme…",
        chatNew: "Neues Thema",
        chatError: "Es ist ein Fehler aufgetreten. Bitte versuch es später noch einmal.",
        chatDisclaimer: "KI-generierte Antwort kann fehlerhaft sein",

        refPage: "Seite {page, number}",
        refOpenProgram: "Wahlprogramm öffnen",

        notInParliament: "Nicht im Bundestag vertreten"
    },

    en: {
        home: "Home",
        about: "About “fragdaswahlprogramm”",
        qna: "Questions & Answers",
        qnaShort: "Q&A",
        parties: "Parties",
        imprint: "Imprint",
        privacy: "Privacy Policy",

        inputPlaceholder: "Your question to the election programs",
        send: "Send",

        chatGenerating: "One moment please…",
        chatSearching: "I'm searching the election programs…",
        chatNew: "New topic",
        chatError: "An error occurred. Please try again later.",
        chatDisclaimer: "AI-generated answer may be incorrect",

        refPage: "page {page, number}",
        refOpenProgram: "Open election program",

        notInParliament: "Not represented in the Bundestag"
    }
}
