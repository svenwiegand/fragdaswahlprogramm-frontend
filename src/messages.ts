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
        about: "Hilfe",
        imprint: "Impressum",
        privacy: "Datenschutz",

        inputPlaceholder: "Deine Frage an die Wahlprogramme",
        send: "Senden",

        chatError: "Es ist ein Fehler aufgetreten. Bitte versuch es später noch einmal.",
    },

    en: {
        about: "Help",
        imprint: "Imprint",
        privacy: "Privacy Policy",

        inputPlaceholder: "Your question to the election programs",
        send: "Send",

        chatError: "An error occurred. Please try again later.",
    }
}
