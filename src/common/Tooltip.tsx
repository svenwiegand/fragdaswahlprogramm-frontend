// This was mainly copied from https://floating-ui.com/docs/tooltip
import * as React from "react"
import {Placement} from "@floating-ui/react"
import {
    autoUpdate,
    flip,
    FloatingPortal,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useMergeRefs,
    useRole,
} from "@floating-ui/react"
import {css} from "@emotion/react"
import {color, rempx} from "../style/styles.ts"

interface TooltipOptions {
    initialOpen?: boolean;
    placement?: Placement;
    open?: boolean;
    containsClickableContent?: boolean;
    onOpenChange?: (open: boolean) => void;
}

function useTooltip({
                        initialOpen = false,
                        placement = "top",
                        open: controlledOpen,
                        containsClickableContent = false,
                        onOpenChange: setControlledOpen,
                    }: TooltipOptions = {}) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)

    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = setControlledOpen ?? setUncontrolledOpen

    const data = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({
                crossAxis: placement.includes("-"),
                fallbackAxisSideDirection: "start",
                padding: 5,
            }),
            shift({padding: 5}),
        ],
    })

    const context = data.context

    const hover = useHover(context, {
        move: false,
        enabled: controlledOpen == null,
        delay: {
            close: containsClickableContent ? 300 : 0
        },
    })
    const focus = useFocus(context, {
        enabled: controlledOpen == null,
    })
    const dismiss = useDismiss(context)
    const role = useRole(context, {role: "tooltip"})

    const interactions = useInteractions([hover, focus, dismiss, role])

    return React.useMemo(
        () => ({
            open,
            setOpen,
            ...interactions,
            ...data,
        }),
        [open, setOpen, interactions, data],
    )
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null)

const useTooltipContext = () => {
    const context = React.useContext(TooltipContext)

    if (context == null) {
        throw new Error("Tooltip components must be wrapped in <Tooltip />")
    }

    return context
}

export function Tooltip({
                            children,
                            ...options
                        }: { children: React.ReactNode } & TooltipOptions) {
    // This can accept any props as options, e.g. `placement`,
    // or other positioning options.
    const tooltip = useTooltip(options)
    return (
        <TooltipContext.Provider value={tooltip}>
            {children}
        </TooltipContext.Provider>
    )
}

export const TooltipTrigger = React.forwardRef<
    HTMLElement,
    React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({children, asChild = false, ...props}, propRef) {
    const context = useTooltipContext()
    const childrenRef = (children as any).ref
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(
            children,
            context.getReferenceProps({
                ref,
                ...props,
                ...children.props,
                "data-state": context.open ? "open" : "closed",
            }),
        )
    }

    return (
        <button
            ref={ref}
            // The user can style the trigger based on the state
            data-state={context.open ? "open" : "closed"}
            {...context.getReferenceProps(props)}
        >
            {children}
        </button>
    )
})

const tooltipStyle = css`
    background-color: ${color.neutral.neutral900};
    color: white;
    padding: ${rempx(12)} ${rempx(16)};
    border-radius: ${rempx(8)};
    max-width: 32em;
    font-size: ${rempx(14)};
    line-height: 1.5;
`

export const TooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(function TooltipContent({style, ...props}, propRef) {
    const context = useTooltipContext()
    const ref = useMergeRefs([context.refs.setFloating, propRef])

    if (!context.open) return null

    return (
        <FloatingPortal>
            <div
                ref={ref}
                style={{
                    ...context.floatingStyles,
                    ...style,
                }}
                css={tooltipStyle}
                {...context.getFloatingProps(props)}
            />
        </FloatingPortal>
    )
})