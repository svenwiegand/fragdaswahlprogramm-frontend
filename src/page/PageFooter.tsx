import {css} from '@emotion/react'
import {Link} from "../style/styled-compontents.tsx"
import {FormattedMessage} from "react-intl"
import {rempx} from "../style/styles.ts"

const footerStyle = css`
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
            <Link href="/imprint"><FormattedMessage id={"imprint"}/></Link>
            <Link href="#"><FormattedMessage id={"privacy"}/></Link>
        </div>
    )
}