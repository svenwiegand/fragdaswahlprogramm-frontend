import React, {useEffect, useRef, useState} from "react"
import {css} from "@emotion/react"
import {dimensions, fontFamily, rempx, responsiveHPadding} from "../style/styles.ts"
import {useIntl} from "react-intl"
import {SendButton} from "./SendButton.tsx"

const containerStyle = css`
    width: 100%;
    ${responsiveHPadding};
    box-sizing: border-box;
    
    display: flex;
    flex-direction: row; 
    justify-content: center;
`

const inputContainerStyle = css`
    flex-grow: 1;
    max-width: ${rempx(580)};
    min-height: ${rempx(52)};
    padding: ${rempx(0)} ${rempx(13)} ${rempx(0)} ${rempx(16)};
    border: 1px #000 solid;
    border-radius: ${rempx(26)};
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const expandedInputContainerStyle = css`
    ${inputContainerStyle};
    max-width: ${dimensions.maxContentWidth};
`

const textareaStyle = css`
    font-family: ${fontFamily};
    font-size: 1rem;
    line-height: 1.5rem;
    max-height: 15rem;
    padding: 0;
    resize: none;
    overflow: hidden;
    flex-grow: 1;
    border: none;
    outline: none;
    background: none;
`

type ChatTextFieldProps = {
    expanded?: boolean
    onSend: (value: string) => void
};

export function ChatTextField({expanded, onSend}: ChatTextFieldProps) {
    const [value, setValue] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        const ref = textareaRef.current
        if (ref) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            ref.style.height = "0px";
            const scrollHeight = ref.scrollHeight;

            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            ref.style.height = scrollHeight + "px";
        }
    }, [textareaRef, value]);

    const sendIfNotEmpty = () => {
        const trimmedValue  = value.trim()
        if (trimmedValue) {
            onSend(trimmedValue)
            setValue("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendIfNotEmpty()
        }
    }

    const intl = useIntl()
    return (
        <div css={containerStyle}>
            <div css={expanded ? expandedInputContainerStyle : inputContainerStyle}>
                <textarea
                    ref={textareaRef}
                    placeholder={intl.formatMessage({id: "inputPlaceholder"})}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    css={textareaStyle}
                />
                <SendButton onClick={sendIfNotEmpty} disabled={!value} iconOnly={true} />
            </div>
        </div>
    )
}