import {css} from "@emotion/react"
import {rempx} from "../style/styles.ts"
import {Action, PageHeader} from "./PageHeader.tsx"
import {PageFooter} from "./PageFooter.tsx"
import {ReactNode, useEffect} from "react"
import {useLocation} from "react-router"

const contentStyle = css`
    width: 100%;
    min-height: 100vh;
    padding: ${rempx(16+1.75*16+16)} 0;
    display: flex;
    flex-direction: column;
`

interface PageProps {
    isSubPage?: boolean
    onBack?: () => void
    headerAction?: Action
    hideFooter?: boolean
    children: ReactNode
}

export function Page({ isSubPage, onBack, headerAction, hideFooter, children }: PageProps) {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    return (
        <>
            <PageHeader isSubPage={isSubPage} onBack={onBack} action={headerAction}/>
            <main css={contentStyle}>
                {children}
            </main>
            {hideFooter ? null : <PageFooter/>}
        </>
    )
}