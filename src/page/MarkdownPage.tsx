import {Page} from "./Page.tsx"
import {useEffect, useState} from "react"
import {useIntl} from "react-intl"
import Markdown from "react-markdown"
import {css} from "@emotion/react"
import {dimensions, responsiveHPadding} from "../style/styles.ts"

const contentContainerStyle = css`
    width: 100%;
    overflow-y: auto;
    ${responsiveHPadding}
`

const contentStyle = css`
    max-width: ${dimensions.maxContentWidth};
    margin: 0 auto;
`

interface MarkdownPageProps {
    contentName: string
}

export function MarkdownPage({ contentName }: MarkdownPageProps) {
    const { locale } = useIntl()
    const [content, setContent] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const lang = locale.split("-")[0]
            const response = await fetch(`/content/${contentName}.${lang}.md`)
            const text = await response.text()
            setContent(text)
        }
        fetchData()
    }, [contentName, locale])
    return (
        <Page isSubPage={true} hideFooter={true}>
            <div css={contentContainerStyle}>
                <Markdown css={contentStyle}>{content}</Markdown>
            </div>
        </Page>)
}