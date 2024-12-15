import {css} from '@emotion/react'
import {NavbarLink} from "../style/styled-compontents.tsx"
import {FormattedMessage} from "react-intl"
import styled from "@emotion/styled"
import {dimensions, rempx} from "../style/styles.ts"

const headerStyle = css`
    padding: 0 ${dimensions.pagePaddingHorizontal};
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
            <NavbarLink to="/" css={logoLinkStyle}>
                <LogoText>frag</LogoText>
                <LogoText css={css`color: #888`}>das</LogoText>
                <LogoText>wahlprogramm</LogoText>
            </NavbarLink>
            <div aria-hidden={true} css={spacerStyle}></div>
            <NavbarLink to="#"><FormattedMessage id={"about"}/></NavbarLink>
        </div>
    )
}