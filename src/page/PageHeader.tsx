import {css} from '@emotion/react'
import {Link} from "../styled-compontents.tsx"
import {FormattedMessage} from "react-intl"

const headerStyle = css`
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    align-self: stretch;
`

const logoStyle = css`
    font-family: Outfit, sans-serif;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #000;
`
const logoLightStyle = css`
    ${logoStyle};
    color: #888;
`

const spacerStyle = css`
    height: 1rem;
    flex: 1 0 0;
`

export function PageHeader() {
    return (
        <div css={headerStyle}>
            <span css={logoStyle}>frag</span>
            <span css={logoLightStyle}>das</span>
            <span css={logoStyle}>wahlprogramm</span>
            <div aria-hidden={true} css={spacerStyle}></div>
            <Link href="#"><FormattedMessage id={"about"}/></Link>
        </div>
    )
}