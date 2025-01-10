import {css} from "@emotion/react"
import {dimensions, rempx} from "../style/styles.ts"

const logoContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
`

const logoStyle = css`
    margin: ${rempx(48)} 0;
    display: inline-block;
    position: relative;
    
    font-family: Outfit, sans-serif;
    font-size: ${rempx(48)};
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    @media (max-width: ${dimensions.mobileMaxWidth}) {
        margin: ${rempx(32)} 0;
        font-size: ${rempx(32)};
    }
`
const logoGradientStyle = css`
    color: #000;
    background: linear-gradient(270deg, #B431ED 0%, #006EE6 50%, #00A396 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
const logoStyleLight = css`
    color: rgba(0, 0, 0, 0);
    background: none;
    background-clip: initial;
    
    position: absolute;
    top: 0;
    left: 0;
    
    & > span {
        color: rgba(255, 255, 255, 0.6);
    }
`


export function Logo() {
    return (
        <div css={logoContainer}>
            <span css={logoStyle}>
                <span css={logoGradientStyle}>frag<span>das</span>wahlprogramm</span>
                <span css={logoStyleLight} aria-hidden={true}>frag<span>das</span>wahlprogramm</span>
            </span>
        </div>
    )
}