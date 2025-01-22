import {css} from "@emotion/react"

export function rempx(px: number): string {
    return `${px/16}rem`;
}

export const dimensions = {
    mobileMaxWidth: rempx(820),
    maxContentWidth: rempx(720),

    desktop: {
        pagePaddingHorizontal: rempx(32),
    },
    mobile: {
        pagePaddingHorizontal: rempx(16),
    },
}

export const responsiveHPadding = css`
    padding-left: ${dimensions.desktop.pagePaddingHorizontal};
    padding-right: ${dimensions.desktop.pagePaddingHorizontal};
    @media (max-width: ${dimensions.mobileMaxWidth}) {
        padding-left: ${dimensions.mobile.pagePaddingHorizontal};
        padding-right: ${dimensions.mobile.pagePaddingHorizontal};
    }
`

export const fontFamily = `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`

export const color = {
    neutral: {
        neutral900: "#424242",
        neutral800: "#616161",
        neutral700: "#757575",
        neutral600: "#9e9e9e",
        neutral500: "#bdbdbd",
        neutral400: "#cfcfcf",
        neutral300: "#e0e0e0",
        neutral200: "#eeeeee", //background
        neutral100: "#f5f5f5",
    },
    error: {
        background: '#FFE8EA', // red-100
        text: '#66141c', // red-990 / text
    },
    success: {
        background: '#dcf5e5', // green-100
        text: '#0d4120', // green-990 / text
    }
}