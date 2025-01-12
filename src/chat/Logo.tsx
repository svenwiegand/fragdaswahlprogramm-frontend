import {css} from "@emotion/react"
import {color, dimensions, rempx} from "../style/styles.ts"

const logoContainer = css`
    margin: 12vh 0 ${rempx(48)};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    
    font-family: Outfit, sans-serif;
    font-size: ${rempx(48)};
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #000;

    @media (max-width: ${dimensions.mobileMaxWidth}) {
        margin: 6vh 0 ${rempx(32)};
        font-size: ${rempx(32)};
    }
`

const logoStyle = css`
`
const logoStyleLight = css`
    ${logoStyle};
    color: ${color.neutral.neutral600};
}
`


export function Logo() {
    return (
        <div css={logoContainer}>
            <span css={logoStyle}>frag</span>
            <span css={logoStyleLight}>das</span>
            <span css={logoStyle}>wahlprogramm</span>
        </div>
    )
}