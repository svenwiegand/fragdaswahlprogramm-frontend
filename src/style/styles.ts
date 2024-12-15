export function rempx(px: number): string {
    return `${px/16}rem`;
}

export const dimensions = {
    pagePaddingHorizontal: rempx(32)
}