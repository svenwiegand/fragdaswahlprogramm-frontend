import {css} from '@emotion/react'
import {NavbarLink} from "../common/NavbarLink.tsx"
import {FormattedMessage} from "react-intl"
import {rempx, responsiveHPadding} from "../style/styles.ts"

const baseStyle = css`
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    align-self: stretch;
`
const footerStyle = css`
    ${baseStyle};
    ${responsiveHPadding};
`
const navStyle = css`
    ${baseStyle};
    flex-grow: 1;
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