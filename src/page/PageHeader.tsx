import {css} from '@emotion/react'
import {NavbarAction, NavbarLink} from "../common/NavbarLink.tsx"
import {FormattedMessage} from "react-intl"
import {responsiveHPadding} from "../style/styles.ts"
import BackIcon from "../icons/icon-back.svg?react"

const headerStyle = css`
    ${responsiveHPadding};
    flex-shrink: 0;
    display: flex;
    align-items: center;
    align-self: stretch;
`

const spacerStyle = css`
    height: 1rem;
    flex: 1 0 0;
`

type Icon = typeof BackIcon

export type Action = {
    icon:  Icon
    title: string
    onClick: () => void
}

export type PageHeaderProps = {
    isSubPage?: boolean
    onBack?: () => void
    action?: Action
    onHeaderAction?: () => void
}

export function PageHeader({isSubPage, onBack, action}: PageHeaderProps) {
    return (
        <div css={headerStyle}>
            {isSubPage
                ? <NavbarAction to="/" onClick={onBack}><BackIcon width={24} height={24}/><FormattedMessage id={"home"}/></NavbarAction>
                : <NavbarLink to="/about"><FormattedMessage id={"about"}/></NavbarLink>
            }
            <div aria-hidden={true} css={spacerStyle}></div>
            {isSubPage
                ? action ? <ActionButton {...action}/>: null
                : <NavbarLink to="/parties"><FormattedMessage id={"parties"}/></NavbarLink>
            }
        </div>
    )
}

const actionButtonStyle = css`
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
`

function ActionButton({title, onClick, ...props}: Action) {
    return (
        <button onClick={onClick} title={title} css={actionButtonStyle}>
            <props.icon width={24} height={24}/>
        </button>
    )
}