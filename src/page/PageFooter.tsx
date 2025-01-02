import {css} from '@emotion/react'
import {NavbarLink} from "../common/NavbarLink.tsx"
import {FormattedMessage} from "react-intl"
import {rempx, responsiveHPadding} from "../style/styles.ts"

const footerStyle = css`
    ${responsiveHPadding};
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: ${rempx(16)};
    align-self: stretch;
`

export function PageFooter() {
    return (
        <div css={footerStyle}>
            <NavbarLink to="/imprint"><FormattedMessage id={"imprint"}/></NavbarLink>
            <NavbarLink to="#"><FormattedMessage id={"privacy"}/></NavbarLink>
        </div>
    )
}