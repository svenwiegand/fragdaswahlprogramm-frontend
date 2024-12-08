import { css } from '@emotion/react'
import {Link} from "../styled-compontents.tsx"
import {FormattedMessage} from "react-intl"

const barStyle = css`
    display: flex;
    align-items: baseline;
    align-self: stretch;
`

const logoStyle = css`
    font-family: Outfit;
    font-size: 24px;
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
    height: 8px;
    flex: 1 0 0;
`

export function PageHeader() {
    return (
        <div css={barStyle}>
            <span css={logoStyle}>frag</span>
            <span css={logoLightStyle}>das</span>
            <span css={logoStyle}>wahlprogramm</span>
            <div aria-hidden={true} css={spacerStyle}></div>
            <Link href="#"><FormattedMessage id={"about"}/></Link>
        </div>
    )
}