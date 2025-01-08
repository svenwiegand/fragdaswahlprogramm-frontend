// The base of this code is copied from https://floating-ui.com/docs/dialog#reusable-dialog-component
import * as React from "react";
import {
    useFloating,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    useMergeRefs,
    FloatingPortal,
    FloatingFocusManager,
    FloatingOverlay,
    useId
} from "@floating-ui/react";
import {css} from "@emotion/react"
import {rempx} from "../style/styles.ts"

interface ModalOptions {
    initialOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

function useModal({
                              initialOpen = false,
                              open: controlledOpen,
                              onOpenChange: setControlledOpen
                          }: ModalOptions = {}) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
    const [labelId, setLabelId] = React.useState<string | undefined>();
    const [descriptionId, setDescriptionId] = React.useState<
        string | undefined
    >();

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;

    const data = useFloating({
        open,
        onOpenChange: setOpen
    });

    const context = data.context;

    const click = useClick(context, {
        enabled: controlledOpen == null
    });
    const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
    const role = useRole(context);

    const interactions = useInteractions([click, dismiss, role]);

    return React.useMemo(
        () => ({
            open,
            setOpen,
            ...interactions,
            ...data,
            labelId,
            descriptionId,
            setLabelId,
            setDescriptionId
        }),
        [open, setOpen, interactions, data, labelId, descriptionId]
    );
}

type ContextType =
    | (ReturnType<typeof useModal> & {
    setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
    >;
})
    | null;

const ModalContext = React.createContext<ContextType>(null);

const useModalContext = () => {
    const context = React.useContext(ModalContext);

    if (context == null) {
        throw new Error("Modal components must be wrapped in <Modal />");
    }

    return context;
};

export function Modal({
                           children,
                           ...options
                       }: {
    children: React.ReactNode;
} & ModalOptions) {
    const dialog = useModal(options);
    return (
        <ModalContext.Provider value={dialog}>{children}</ModalContext.Provider>
    );
}

interface ModalTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
}

export const ModalTrigger = React.forwardRef<
    HTMLElement,
    React.HTMLProps<HTMLElement> & ModalTriggerProps
>(function ModalTrigger({ children, asChild = false, ...props }, propRef) {
    const context = useModalContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(
            children,
            context.getReferenceProps({
                ref,
                ...props,
                ...children.props,
                "data-modal-state": context.open ? "open" : "closed"
            })
        );
    }

    return (
        <button
            ref={ref}
            // The user can style the trigger based on the state
            data-modal-state={context.open ? "open" : "closed"}
            {...context.getReferenceProps(props)}
        >
            {children}
        </button>
    );
});

const modalOverlayStyle = css`
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
`
const modalStyle = css`
    margin: ${rempx(16)};
    padding: ${rempx(16)};
    background-color: white;
`

export const ModalContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(function ModalContent(props, propRef) {
    const { context: floatingContext, ...context } = useModalContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!floatingContext.open) return null;

    return (
        <FloatingPortal>
            <FloatingOverlay className="Modal-overlay" css={modalOverlayStyle} lockScroll>
                <FloatingFocusManager context={floatingContext}>
                    <div
                        ref={ref}
                        css={modalStyle}
                        aria-labelledby={context.labelId}
                        aria-describedby={context.descriptionId}
                        {...context.getFloatingProps(props)}
                    >
                        {props.children}
                    </div>
                </FloatingFocusManager>
            </FloatingOverlay>
        </FloatingPortal>
    );
});

export const ModalHeading = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLProps<HTMLHeadingElement>
>(function ModalHeading({ children, ...props }, ref) {
    const { setLabelId } = useModalContext();
    const id = useId();

    // Only sets `aria-labelledby` on the Modal root element
    // if this component is mounted inside it.
    React.useLayoutEffect(() => {
        setLabelId(id);
        return () => setLabelId(undefined);
    }, [id, setLabelId]);

    return (
        <h2 {...props} ref={ref} id={id}>
            {children}
        </h2>
    );
});

export const ModalDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLProps<HTMLParagraphElement>
>(function ModalDescription({ children, ...props }, ref) {
    const { setDescriptionId } = useModalContext();
    const id = useId();

    // Only sets `aria-describedby` on the Modal root element
    // if this component is mounted inside it.
    React.useLayoutEffect(() => {
        setDescriptionId(id);
        return () => setDescriptionId(undefined);
    }, [id, setDescriptionId]);

    return (
        <p {...props} ref={ref} id={id}>
            {children}
        </p>
    );
});

export const ModalClose = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(function ModalClose(props, ref) {
    const { setOpen } = useModalContext();
    return (
        <button type="button" {...props} ref={ref} onClick={() => setOpen(false)} />
    );
});
