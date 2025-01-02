import styled from '@emotion/styled'
import {Link as RouterLink} from "react-router"
import {css} from "@emotion/react"
import {color} from "../style/styles.ts"

const navbarLinkStyle = css`
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration: none;
    color: ${color.neutral.neutral900};
    &:hover {
        text-decoration: none;
    }
`

export const NavbarLink = styled(RouterLink)`
    ${navbarLinkStyle};
`

export const NavbarAction = styled(RouterLink)`
    ${navbarLinkStyle};
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
`