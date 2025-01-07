import {parties} from "../common/parties.ts"
import {ReactNode} from "react"
import {css} from "@emotion/react"
import {color, rempx} from "../style/styles.ts"
import {parseReferenceUrl, Reference} from "./reference-link.ts"

export type ReferenceLinkProps = {
    href?: string
    target?: string
    children?: ReactNode
}

export function EventualReferenceLink({href, ...props}: ReferenceLinkProps) {
    const ref = href ? parseReferenceUrl(href) : undefined
    if (ref) {
        return ref.party in parties ? <ReferenceLink {...ref} /> : null
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

function ReferenceLink({party, section, shortSection, page, quote}: Reference) {
    const quoteText = quote ? `\n„${quote}”` : ""
    const title = `${parties[party].manifesto.title}\n${section}\nSeite ${page}${quoteText}`
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