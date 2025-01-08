import {css} from "@emotion/react"
import {rempx} from "../style/styles.ts"

type FlexSpacerProps = {
    grow: number
    portraitGrow?: number
}

export function FlexSpacer({grow, portraitGrow}: FlexSpacerProps) {
    const style = css`
        flex-grow: ${grow};
        @media (orientation: portrait) {
            flex-grow: ${portraitGrow ?? grow};
        }
    `
    return <div css={style}/>
}

type AbsoluteSpacerProps = {
    /** Defaults to vertical */
    direction?: "vertical" | "horizontal"
    space: number
    portraitSpace?: number
}

export function AbsoluteSpacer({direction, space, portraitSpace}: AbsoluteSpacerProps) {
    const style = css`
        ${!direction || direction === "vertical" ? "height" : "width"}: ${rempx(space)};
        @media (orientation: portrait) {
            ${direction === "vertical" ? "height" : "width"}: ${rempx(portraitSpace ?? space)};
        }
    `
    return <div css={style}/>
}