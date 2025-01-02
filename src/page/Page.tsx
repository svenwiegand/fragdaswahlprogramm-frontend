import {css} from "@emotion/react"
import {rempx} from "../style/styles.ts"
import {PageHeader} from "./PageHeader.tsx"
import {PageFooter} from "./PageFooter.tsx"

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
    hideHeaderAndFooter?: boolean
    children: React.ReactNode
}

export function Page({ hideHeaderAndFooter, children }: PageProps) {
    return (
        <div css={pageStyle}>
            {hideHeaderAndFooter ? null : <PageHeader/>}
            <article css={contentStyle}>
                {children}
            </article>
            {hideHeaderAndFooter ? null : <PageFooter/>}
        </div>
    )
}