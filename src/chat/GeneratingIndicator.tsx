import {css} from "@emotion/react"
import {color} from "../style/styles.ts"
import {useIntl} from "react-intl"
import {forwardRef} from "react"

const containerStyle = css`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const indicatorStyle = css`
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: ${color.neutral.neutral700};
    border-radius: 50%;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% {
            transform: scale(1);
            background-color: ${color.neutral.neutral700};
        }
        50% {
            transform: scale(0.8);
            background-color: ${color.neutral.neutral500};
        }
        100% {
            transform: scale(1);
            background-color: ${color.neutral.neutral700};
        }
    }
`

const indicatorTextStyle = css`
    margin-left: 0.5rem;
    background: linear-gradient(
            to left,
            ${color.neutral.neutral700} 0%,
            ${color.neutral.neutral700} 60%,
            ${color.neutral.neutral500} 70%,
            ${color.neutral.neutral700} 80%
    );
    color: #000;
    background-size: 200% auto;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shining 3s linear infinite;

    @keyframes shining {
        to {
            background-position: -200% center;
        }
    }
`

export type GeneratingIndicatorProps = {
    alreadyReceivedText: boolean
}

export const GeneratingIndicator = forwardRef<HTMLDivElement, GeneratingIndicatorProps>((
    {alreadyReceivedText}: GeneratingIndicatorProps,
    ref
) => {
    const intl = useIntl()
    return (
        <div ref={ref} css={containerStyle}>
            <div css={indicatorStyle}/>
            {alreadyReceivedText ? null :
                <span css={indicatorTextStyle}>{intl.formatMessage({id: "chatGenerating"})}</span>}
        </div>
    )
})