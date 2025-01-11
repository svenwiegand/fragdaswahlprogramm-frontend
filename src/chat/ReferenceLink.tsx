import {parties} from "../common/parties.ts"
import {ReactNode} from "react"
import {css} from "@emotion/react"
import {color, rempx} from "../style/styles.ts"
import {parseReferenceUrl, Reference} from "./reference-link.ts"
import {Tooltip, TooltipContent, TooltipTrigger} from "../common/Tooltip.tsx"
import {FormattedMessage} from "react-intl"

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

const tooltipTextStyle = css`
    hyphens: auto;
`
const tooltipTitleStyle = css`
    font-size: ${rempx(12)};
    ${tooltipTextStyle};
`
const tooltipSectionStyle = css`
    font-weight: bold;
    ${tooltipTextStyle};
`
const tooltipQuoteStyle = css`
    font-style: italic;
    ${tooltipTextStyle};
    ::before {
        content: "„";
        position: relative;
        margin-left: -0.5em;
        display: inline-block;
    }
    ::after {
        content: "“";
    }
`
const tooltipBottomLineStyle = css`
    margin-top: 0.4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${tooltipTextStyle};
`
const tooltipPageStyle = css`
    ${tooltipTextStyle};
    color: ${color.neutral.neutral300};
`
const tooltipLinkStyle = css`
    margin-left: 2em;
    ${tooltipTextStyle};
    color: ${color.neutral.neutral400};
    
    &:hover {
        color: ${color.neutral.neutral100};
        text-decoration: none;
    }
`

function ReferenceLink({party, section, shortSection, page, quote}: Reference) {
    const href = `${parties[party].manifesto.url}#page=${page + parties[party].manifesto.pageOffset}${quote ? `search=${encodeURIComponent(quote)}` : ""}`
    return (
        <Tooltip placement={"bottom-start"} containsClickableContent={true}>
            <TooltipTrigger>
                <span css={referenceLinkStyle}>{shortSection}</span>
            </TooltipTrigger>
            <TooltipContent>
                <div css={tooltipTitleStyle}>{parties[party].manifesto.title}</div>
                <div css={tooltipSectionStyle}>{section}</div>
                {quote && <div css={tooltipQuoteStyle}>{quote}</div>}
                <div css={tooltipBottomLineStyle}>
                    <div css={tooltipPageStyle}><FormattedMessage id={"refPage"} values={{page}}/></div>
                    <a href={href} target={"_blank"} css={tooltipLinkStyle}><FormattedMessage id={"refOpenProgram"}/> ↗</a>
                </div>
            </TooltipContent>
        </Tooltip>
    )
}