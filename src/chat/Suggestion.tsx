import {useCallback} from "react"
import {css} from "@emotion/react"
import {color, rempx} from "../style/styles.ts"

const gap = rempx(16)

const containerStyle = css`
    display: flex;
    flex-wrap: wrap;
    gap: ${gap};
    justify-content: center;
    align-items: stretch;
`

const suggestionStyle = css`
    flex: 1 1 calc(25% - ${gap});
    max-width: ${rempx(360)};
    min-width: ${rempx(240)};
    box-sizing: border-box;
    padding: ${rempx(16)};
    border: 1px solid ${color.neutral.neutral400};
    border-radius: ${rempx(8)};
    
    display: flex;
    align-items: center;
    text-align: left;
    color: ${color.neutral.neutral800};
    
    cursor: pointer;
`

export type SuggestionContainerProps = {
    suggestions: string[]
    onClick: (suggestion: string) => void
}

export function Suggestions({suggestions, onClick}: SuggestionContainerProps) {
    return (
        <div css={containerStyle}>
            {suggestions.map((suggestion, index) =>
                <SuggestionButton key={index} suggestion={suggestion} onClick={onClick}/>)
            }
        </div>
    )
}

function SuggestionButton({suggestion, onClick}: {suggestion: string, onClick: (suggestion: string) => void}) {
    const onButtonClick = useCallback(() => onClick(suggestion), [suggestion, onClick])
    return (
        <button css={suggestionStyle} onClick={onButtonClick}>
            {suggestion}
        </button>
    )
}