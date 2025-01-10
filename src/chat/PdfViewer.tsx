import {Modal, ModalClose, ModalContent, ModalDescription, ModalHeading, ModalTrigger} from "../common/Modal.tsx"
import {useCallback, useEffect} from "react"
import {Document, Page, pdfjs} from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

type PdfViewerProps = {
    file: string
    page: number
    highlight?: string
    children: React.ReactNode
}

/** Not exported by react-pdf */
type TextItem = { pageIndex: number; pageNumber: number; itemIndex: number } & {
    str: string
    dir: string
    transform: Array<unknown>
    width: number
    height: number
    fontName: string
    hasEOL: boolean
}


export function PdfViewer({file, page, highlight, children}: PdfViewerProps) {
    console.log(highlight)
    const textRenderer = useCallback((item: TextItem) =>
        highlight ? highlightPattern(item.str, highlight): item.str
    , [highlight])
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = "/scripts/pdf.worker.min.mjs"
    }, [])
    return (
        <Modal>
            <ModalTrigger asChild={true}>
                {children}
            </ModalTrigger>
            <ModalContent>
                <ModalHeading>PDF Viewer</ModalHeading>
                <ModalDescription>
                    <Document file={file}>
                        <Page pageNumber={page} customTextRenderer={textRenderer} />
                    </Document>
                </ModalDescription>
                <ModalClose>Close</ModalClose>
            </ModalContent>
        </Modal>
    )
}

function highlightPattern(text: string, pattern: string): string {
    return text.replace(pattern, value => `<mark>${value}</mark>`)
}
