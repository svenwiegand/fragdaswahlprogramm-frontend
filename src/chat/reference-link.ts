import {Party} from "../common/parties.ts"

export type Reference = {
    party: Party
    section: string
    shortSection: string
    page: number
    quote?: string
}

export function createReferenceMarkdownLink({party, page, shortSection, section, quote}: Reference): string {
    const encodedSection = encodeURIComponent(section)
    const encodedShortSection = encodeURIComponent(shortSection)
    const encodedQuote = quote ? encodeURIComponent(quote) : ""
    return `[${shortSection}](https://fragdaswahlprogramm.de/reference?party=${party}&section=${encodedSection}&shortSection=${encodedShortSection}&page=${page}&quote=${encodedQuote})`
}

export function parseReferenceUrl(link: string): Reference | undefined {
    if (!link.startsWith("https://fragdaswahlprogramm.de/reference")) {
        return undefined
    }

    const extractParam = (url: URL, name: string, optional: boolean = false) => {
        const value = url.searchParams.get(name)
        if (!value) {
            if (optional) {
                return ""
            } else {
                throw new Error(`Missing parameter ${name} in reference link ${link}`)
            }
        }
        return decodeURIComponent(value)
    }

    try {
        const url = new URL(link)
        const party = extractParam(url, "party") as Party
        const section = extractParam(url, "section")
        const shortSection = extractParam(url, "shortSection")
        const page = Number(extractParam(url, "page"))
        const quote = extractParam(url, "quote", true)
        return {party, section, shortSection, page, quote}
    } catch (e) {
        console.error(`Error parsing reference link ${link}: ${e}`)
        return undefined
    }
}
