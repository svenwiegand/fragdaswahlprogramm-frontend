import {css} from '@emotion/react'
import {NavbarLink} from "../style/styled-compontents.tsx"
import {FormattedMessage} from "react-intl"
import {dimensions, rempx} from "../style/styles.ts"

const footerStyle = css`
    padding: 0 ${dimensions.pagePaddingHorizontal};
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