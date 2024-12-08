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
    return navigator.languages ?? [navigator.language] ?? ["de-de"]
}

const messages: Record<string, MessagesById> = {
    de: {
        about: "Hilfe",
    },

    en: {
        about: "Help",
    }
}
