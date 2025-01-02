import {css} from "@emotion/react"

export function rempx(px: number): string {
    return `${px/16}rem`;
}

export const dimensions = {
    maxContentWidth: rempx(720),

    desktop: {
        pagePaddingHorizontal: rempx(32),
    },
    mobile: {
        pagePaddingHorizontal: rempx(16),
    },
}

export const responsiveHPadding = css`
    padding: 0 ${dimensions.desktop.pagePaddingHorizontal};
    @media (max-width: 820px) {
        padding: 0 ${dimensions.mobile.pagePaddingHorizontal};
    }
`

export const fontFamily = `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`

export const color = {
    neutral: {
        neutral900: "#424242",
    },
    error: {
        background: '#FFE8EA', // red-100
        text: '#66141c', // red-990 / text
    },
}