import {parties} from "../common/parties.ts"
import {ReactNode} from "react"
import {css} from "@emotion/react"
import {color, rempx} from "../style/styles.ts"
import {parseReferenceUrl, Reference} from "./reference-link.ts"
import {Tooltip, TooltipContent, TooltipTrigger} from "../common/Tooltip.tsx"
import {FormattedMessage} from "react-intl"
import {PdfViewer} from "./PdfViewer.tsx"

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

const tooltipTitleStyle = css`
    font-size: ${rempx(12)};
`
const tooltipSectionStyle = css`
    font-weight: bold;
`
const tooltipBottomLineStyle = css`
    display: flex;
    align-items: center;
`
const tooltipPageStyle = css`
    color: ${color.neutral.neutral300};
`
const tooltipDisclaimerStyle = css`
    font-size: 0.8em;
    margin-left: 0.6em;
    color: ${color.neutral.neutral500};
`

export function ReferenceLink({party, section, shortSection, page, quote}: Reference) { //todo: Remove export
    return (
        <Tooltip placement={"bottom-start"}>
            <PdfViewer file={`/programs/${party}.pdf`} page={page + parties[party].manifesto.pageOffset} highlight={quote}>
                <TooltipTrigger>
                    <span css={referenceLinkStyle}>
                        {shortSection}
                    </span>
                </TooltipTrigger>
            </PdfViewer>
            <TooltipContent>
                <div css={tooltipTitleStyle}>{parties[party].manifesto.title}</div>
                <div css={tooltipSectionStyle}>{section}</div>
                <div css={tooltipBottomLineStyle}>
                    <div css={tooltipPageStyle}><FormattedMessage id={"refPage"} values={{page}}/></div>
                    <div css={tooltipDisclaimerStyle}>(<FormattedMessage id={"refDisclaimer"}/>)</div>
                </div>
            </TooltipContent>
        </Tooltip>
    )
}