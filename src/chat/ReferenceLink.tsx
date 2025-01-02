import {parties, Party} from "../common/parties.ts"
import {ReactNode} from "react"
import {css} from "@emotion/react"

export type Reference = {
    party: Party
    section: string
    shortSection: string
    page: number
}

export function createReferenceMarkdownLink({party, page, shortSection, section}: Reference): string {
    const encodedSection = encodeURIComponent(section)
    const encodedShortSection = encodeURIComponent(shortSection)
    return `[${shortSection}](https://fragdaswahlprogramm.de/reference?party=${party}&section=${encodedSection}&shortSection=${encodedShortSection}&page=${page})`
}

function parseReferenceUrl(link: string): Reference | undefined {
    if (!link.startsWith("https://fragdaswahlprogramm.de/reference")) {
        return undefined
    }

    const extractParam = (url: URL, name: string) => {
        const value = url.searchParams.get(name)
        if (!value) {
            throw new Error(`Missing parameter ${name} in reference link ${link}`)
        }
        return decodeURIComponent(value)
    }

    try {
        const url = new URL(link)
        const party = extractParam(url, "party") as Party
        const section = extractParam(url, "section")
        const shortSection = extractParam(url, "shortSection")
        const page = Number(extractParam(url, "page"))
        return {party, section, shortSection, page}
    } catch (e) {
        console.error(`Error parsing reference link ${link}: ${e}`)
        return undefined
    }
}

export type ReferenceLinkProps = {
    href?: string
    target?: string
    children?: ReactNode
}

export function EventualReferenceLink({href, ...props}: ReferenceLinkProps) {
    const ref = href ? parseReferenceUrl(href) : undefined
    if (ref) {
        return <ReferenceLink {...ref}/>
    } else {
        return <a href={href} {...props}>{props.children}</a>
    }
}

function ReferenceLink({party, section, shortSection, page}: Reference) {
    const title = `${parties[party].manifestoTitle}\n${section}\nSeite ${page}`
    return (
        <a
            href={parties[party].manifestoLink}
            target={"_blank"}
            title={title}
            css={css`
                display: inline-block;
                background-color: #eee;
                color: #757575;
                border-radius: 1rem;
                text-decoration: none;
                cursor: pointer;
                padding: 4px 8px;
                line-height: 1rem;
                font-size: 0.8rem;
            `}
        >
            {shortSection}
        </a>
    )
}