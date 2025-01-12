import {css} from '@emotion/react'
import {NavbarLink} from "../common/NavbarLink.tsx"
import {FormattedMessage} from "react-intl"
import {rempx, responsiveHPadding} from "../style/styles.ts"
import {forwardRef} from "react"

const footerStyle = css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    ${responsiveHPadding};
    padding-top: ${rempx(16)};
    padding-bottom: max(env(safe-area-inset-bottom, 0), ${rempx(16)});
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

type PageFooterProps = object

export const PageFooter = forwardRef<HTMLDivElement, PageFooterProps>((_, ref) => {
    return (
        <footer css={footerStyle} ref={ref}>
            <nav css={navStyle}>
                <NavbarLink to="/imprint"><FormattedMessage id={"imprint"}/></NavbarLink>
                <NavbarLink to="/privacy"><FormattedMessage id={"privacy"}/></NavbarLink>
                <NavbarLink to="/parties"><FormattedMessage id={"parties"}/></NavbarLink>
            </nav>
        </footer>
    )
})