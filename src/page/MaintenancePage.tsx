import {css} from "@emotion/react"
import {Logo} from "../chat/Logo.tsx"

const containerStyle = css`
    margin: -4rem 0 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #333;

    h1, p {
        margin: 0.5rem 0
    }
    h1 {
        font-family: 'Outfit', 'Inter', sans-serif;
        font-weight: 700;
    }
`

export function MaintenancePage() {
    return (
        <div css={containerStyle}>
            <Logo/>
            <p>Wir führen gerade Wartungsarbeiten durch.</p>
            <p>Bitte probier es später nochmal.</p>
        </div>
    )
}
