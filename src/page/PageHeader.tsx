import {css} from '@emotion/react'
import {Link} from "../style/styled-compontents.tsx"
import {FormattedMessage} from "react-intl"
import styled from "@emotion/styled"
import {rempx} from "../style/styles.ts"

const headerStyle = css`
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    align-self: stretch;
`

const logoLinkStyle = css`
    text-decoration: none;
`

const logoStyle = css`
    font-family: Outfit, sans-serif;
    font-size: ${rempx(24)};
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #000;
`

const spacerStyle = css`
    height: 1rem;
    flex: 1 0 0;
`

const LogoText = styled.span(logoStyle)

export function PageHeader() {
    return (
        <div css={headerStyle}>
            <a href="/" css={logoLinkStyle}>
                <LogoText>frag</LogoText>
                <LogoText css={css`color: #888`}>das</LogoText>
                <LogoText>wahlprogramm</LogoText>
            </a>
            <div aria-hidden={true} css={spacerStyle}></div>
            <Link href="#"><FormattedMessage id={"about"}/></Link>
        </div>
    )
}