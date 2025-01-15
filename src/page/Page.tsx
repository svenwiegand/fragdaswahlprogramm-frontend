import {css} from "@emotion/react"
import {Action, PageHeader} from "./PageHeader.tsx"
import {PageFooter} from "./PageFooter.tsx"
import {ReactNode, useEffect} from "react"
import {useLocation} from "react-router"
import {useElementHeight} from "../common/react-utils.ts"

const contentStyle = css`
    width: 100%;
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
    const [headerRef, headerHeight] = useElementHeight<HTMLDivElement>()
    const [footerRef, footerHeight] = useElementHeight<HTMLDivElement>()
    const additionalStyle = css`
        padding: ${headerHeight}px 0 ${footerHeight}px 0;
        scroll-margin: ${headerHeight}px 0 ${footerHeight}px 0;
    `

    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <>
            <PageHeader isSubPage={isSubPage} onBack={onBack} action={headerAction} ref={headerRef}/>
            <main css={[contentStyle, additionalStyle]}>
                {children}
            </main>
            {hideFooter ? null : <PageFooter ref={footerRef}/>}
        </>
    )
}
