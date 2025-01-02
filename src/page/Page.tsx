import {css} from "@emotion/react"
import {rempx} from "../style/styles.ts"
import {Action, PageHeader} from "./PageHeader.tsx"
import {PageFooter} from "./PageFooter.tsx"
import {ReactNode} from "react"

const pageStyle = css`
    height: 100%;
    box-sizing: border-box;
    padding: ${rempx(16)} 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const contentStyle = css`
    flex-grow: 1;
    width: 100%;
    padding: ${rempx(16)} 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

interface PageProps {
    isSubPage?: boolean
    onBack?: () => void
    headerAction?: Action
    hideFooter?: boolean
    children: ReactNode
}

export function Page({ isSubPage, onBack, headerAction, hideFooter, children }: PageProps) {
    return (
        <div css={pageStyle}>
            <PageHeader isSubPage={isSubPage} onBack={onBack} action={headerAction}/>
            <article css={contentStyle}>
                {children}
            </article>
            {hideFooter ? null : <PageFooter/>}
        </div>
    )
}