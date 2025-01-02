import {css} from '@emotion/react'
import {NavbarLink} from "../style/styled-compontents.tsx"
import {FormattedMessage} from "react-intl"
import {responsiveHPadding} from "../style/styles.ts"

const headerStyle = css`
    ${responsiveHPadding};
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    align-self: stretch;
`

const spacerStyle = css`
    height: 1rem;
    flex: 1 0 0;
`

export function PageHeader() {
    return (
        <div css={headerStyle}>
            <NavbarLink to="#"><FormattedMessage id={"about"}/></NavbarLink>
            <div aria-hidden={true} css={spacerStyle}></div>
            <NavbarLink to="#"><FormattedMessage id={"parties"}/></NavbarLink>
        </div>
    )
}