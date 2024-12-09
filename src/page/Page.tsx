import {css} from "@emotion/react"
import {rempx} from "../style/styles.ts"
import {PageHeader} from "./PageHeader.tsx"
import {PageFooter} from "./PageFooter.tsx"

const pageStyle = css`
    height: 100vh;
    box-sizing: border-box;
    padding: ${rempx(16)} ${rempx(32)};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const contentStyle = css`
    flex-grow: 1;
    width: 100%;
    padding: ${rempx(16)} 0;
    overflow: scroll;
`

interface PageProps {
    children: React.ReactNode
}

export function Page({ children }: PageProps) {
    return (
        <div css={pageStyle}>
            <PageHeader/>
            <article css={contentStyle}>
                {children}
            </article>
            <PageFooter/>
        </div>
    )
}