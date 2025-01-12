import { useState, useEffect, useRef, useCallback } from 'react';

export function useElementHeight<T extends HTMLElement>(): [React.RefObject<T>, number] {
    const elementRef = useRef<T>(null);
    const [height, setHeight] = useState(0);

    const updateHeight = useCallback(() => {
        if (elementRef.current) {
            setHeight(elementRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        // Initial height update
        updateHeight();

        // Observer to watch for resize changes
        const resizeObserver = new ResizeObserver(() => updateHeight());
        if (elementRef.current) {
            resizeObserver.observe(elementRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [updateHeight]);

    return [elementRef, height];
}
