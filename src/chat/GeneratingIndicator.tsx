import {css} from "@emotion/react"
import {color} from "../style/styles.ts"

const indicatorStyle = css`
    width: 1em;
    height: 1em;
    background-color: ${color.neutral.neutral900};
    opacity: 1;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
    
    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`

export function GeneratingIndicator() {
    return <div css={indicatorStyle}/>
}