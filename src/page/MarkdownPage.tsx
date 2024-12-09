import {Page} from "./Page.tsx"
import {useEffect, useState} from "react"
import {useIntl} from "react-intl"
import Markdown from "react-markdown"


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
        <Page>
            <Markdown>{content}</Markdown>
        </Page>)
}