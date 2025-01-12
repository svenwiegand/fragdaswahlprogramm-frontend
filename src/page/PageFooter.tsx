import {css} from '@emotion/react'
import {NavbarLink} from "../common/NavbarLink.tsx"
import {FormattedMessage} from "react-intl"
import {rempx, responsiveHPadding} from "../style/styles.ts"

const footerStyle = css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    ${responsiveHPadding};
    padding-top: ${rempx(16)};
    padding-bottom: ${rempx(16)};
`
const navStyle = css`
    flex-grow: 1;
    flex-shrink: 0;
    align-self: stretch;
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: ${rempx(16)};
`

export function PageFooter() {
    return (
        <footer css={footerStyle}>
            <nav css={navStyle}>
                <NavbarLink to="/imprint"><FormattedMessage id={"imprint"}/></NavbarLink>
                <NavbarLink to="/privacy"><FormattedMessage id={"privacy"}/></NavbarLink>
                <NavbarLink to="/parties"><FormattedMessage id={"parties"}/></NavbarLink>
            </nav>
        </footer>
    )
}