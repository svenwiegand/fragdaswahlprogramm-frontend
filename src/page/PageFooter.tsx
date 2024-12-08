import {css} from '@emotion/react'
import {Link} from "../styled-compontents.tsx"
import {FormattedMessage} from "react-intl"

const footerStyle = css`
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 1rem;
    align-self: stretch;
`

export function PageFooter() {
    return (
        <div css={footerStyle}>
            <Link href="#"><FormattedMessage id={"imprint"}/></Link>
            <Link href="#"><FormattedMessage id={"privacy"}/></Link>
        </div>
    )
}