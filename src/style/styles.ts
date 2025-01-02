export function rempx(px: number): string {
    return `${px/16}rem`;
}

export const dimensions = {
    pagePaddingHorizontal: rempx(32)
}

export const fontFamily = `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`

export const color = {
    error: {
        background: '#FFE8EA', // red-100
        text: '#66141c', // red-990 / text
    },
}