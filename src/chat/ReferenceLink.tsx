import {parties, Party} from "../common/parties.ts"
import {ReactNode} from "react"
import {css} from "@emotion/react"
import {color, rempx} from "../style/styles.ts"

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

const referenceLinkStyle = css`
    display: inline-flex;
    align-items: center;
    height: ${rempx(22)};
    padding: 0 ${rempx(8)};
    border-radius: ${rempx(12)};
    
    line-height: ${rempx(14)};
    font-size: ${rempx(8)};
    
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    cursor: pointer;
    
    background-color: ${color.neutral.neutral200};
    color: ${color.neutral.neutral800};
    
    &:hover {
        background-color: ${color.neutral.neutral900};
        color: ${color.neutral.neutral100};
        text-decoration: none;
    }
`

function ReferenceLink({party, section, shortSection, page}: Reference) {
    const title = `${parties[party].manifesto.title}\n${section}\nSeite ${page}`
    const href = `${parties[party].manifesto.url}#page=${page + parties[party].manifesto.pageOffset}`
    return (
        <a
            href={href}
            target={"_blank"}
            title={title}
            css={referenceLinkStyle}
        >
            <span>{shortSection}</span>
        </a>
    )
}