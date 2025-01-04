import {rempx} from "../style/styles.ts"
import {css} from "@emotion/react"

const logoStyle = css`
    height: ${rempx(60)};
`

type ImageProps = {
    src?: string
    alt?: string
}

export function EventualLogoImage({src, alt}: ImageProps) {
    const style = src && src.startsWith("/logos/") ? logoStyle : undefined
    return <img src={src} alt={alt} css={style}/>
}
