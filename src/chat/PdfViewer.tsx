import {Modal, ModalClose, ModalContent, ModalDescription, ModalHeading, ModalTrigger} from "../common/Modal.tsx"

type PdfViewerProps = {
    children: React.ReactNode
}

export function PdfViewer({children}: PdfViewerProps) {
    return (
        <Modal>
            <ModalTrigger asChild={true}>
                {children}
            </ModalTrigger>
            <ModalContent>
                <ModalHeading>PDF Viewer</ModalHeading>
                <ModalDescription>content</ModalDescription>
                <ModalClose>Close</ModalClose>
            </ModalContent>
        </Modal>
    )

}