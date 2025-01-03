import {useIntl} from "react-intl"
import {css} from "@emotion/react"
import SendIcon from "../icons/icon-send.svg?react"
import {rempx} from "../style/styles.ts"

const buttonEnabledStyle = css`
    margin: 0;
    padding: 0;
    background: black;
    border: none;
    border-radius: ${rempx(16)};
    color: white;
    cursor: pointer;
    
    display: flex;
    flex-direction: row;
    align-items: center;
`
const buttonDisabledStyle = css`
    ${buttonEnabledStyle};
    opacity: 0.3;
`

const labelStyle = css`
    margin-left: ${rempx(16)};
`

export type SendButtonProps = {
    iconOnly?: boolean
    disabled?: boolean
    onClick: () => void
}

export function SendButton({iconOnly, disabled, onClick}: SendButtonProps) {
    const intl = useIntl()
    const buttonStyle = disabled ? buttonDisabledStyle : buttonEnabledStyle
    return (
        <button
            onClick={onClick}
            aria-label={intl.formatMessage({id: "send"})}
            css={buttonStyle}
            style={iconOnly ? {background: "none"} : {}}
            disabled={disabled}
        >
            {iconOnly ? null : <span css={labelStyle}>{intl.formatMessage({id: "send"})}</span>}
            <SendIcon width={32} height={32}/>
        </button>
    )
}