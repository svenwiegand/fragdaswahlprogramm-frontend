import {parties, partiesWithoutProgram, PartyProps, PartyWithoutProgramProps} from "../common/parties.ts"
import {css} from "@emotion/react"
import {color, rempx} from "../style/styles.ts"
import ManifestoIcon from "../icons/icon-manifesto.svg?react"
import WebIcon from "../icons/icon-website.svg?react"
import {FormattedMessage, useIntl} from "react-intl"

const partiesDetailsStyle = css`
    & h2 {
        margin-top: 4rem;
    }
`
export function PartiesDetails() {
    return (
        <div css={partiesDetailsStyle}>
            <PartiesDetailsSection headerId="partyInParliament" filter={party => party.parliament}/>
            <PartiesDetailsSection headerId="partyNotInParliament"
                                   filter={party => !party.parliament}/>
            <PartiesWithoutProgramDetailsSection headerId="partyWithoutProgram" />
        </div>
    )
}

function PartiesDetailsSection({headerId, filter}: { headerId: string, filter: (party: PartyProps) => boolean }) {
    return (
        <>
            <h2><FormattedMessage id={headerId}/></h2>
            {Object.values(parties).filter(filter).map(party => (
                <PartyDetails key={party.symbol} party={party}/>
            ))}
        </>
    )
}

function PartiesWithoutProgramDetailsSection({headerId}: { headerId: string }) {
    return (
        <>
            <h2><FormattedMessage id={headerId}/></h2>
            {Object.values(partiesWithoutProgram).map(party => (
                <PartyWithoutProgramDetails key={party.symbol} party={party}/>
            ))}
        </>
    )
}


const propListStyle = css`
    padding: 0;
    list-style-type: none;
    & li {
        margin: 0.5rem 0;
        display: flex;
        line-height: 1.6em;
        flex-direction: row;
        justify-items: center;
        gap: ${rempx(8)};
        overflow: hidden;
        
        & a {
            flex-shrink: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        & svg {
            flex-shrink: 0;
        }
    }
`
function PartyDetails({party}: { party: PartyProps }) {
    return (
        <div>
            <h3>{party.name}</h3>
            <ul css={propListStyle}>
                <li><ManifestoIcon aria-hidden/> <a href={party.manifesto.url} target={"_blank"}>{party.manifesto.title}</a> <Status draft={party.manifesto.draft}/> </li>
                <li><WebIcon aria-hidden/> <a href={party.manifesto.website} target={"_blank"}><FormattedMessage id={"partyWebsiteWithLinkToProgram"}/></a></li>
            </ul>
        </div>
    )
}

function PartyWithoutProgramDetails({party}: { party: PartyWithoutProgramProps }) {
    return (
        <div>
            <h3>{party.name}</h3>
            <ul css={propListStyle}>
                <li><WebIcon aria-hidden/> <a href={party.manifesto.website} target={"_blank"}><FormattedMessage id={"partyWebsite"}/></a></li>
            </ul>
        </div>
    )
}

const statusStyle = css`
    flex-shrink: 0;
    padding: 0 ${rempx(8)};
    border-radius: ${rempx(16)};
    font-size: 0.8rem;
    line-height: ${rempx(24)};
    max-height: ${rempx(24)};
    background-color: ${color.success.background};
    color: ${color.success.text};
`
const statusDraftStyle = css`
    ${statusStyle};
    background-color: ${color.error.background};
    color: ${color.error.text};
`
function Status({draft}: { draft: boolean }) {
    const intl = useIntl()
    const style = draft ? statusDraftStyle : statusStyle
    const label = intl.formatMessage({id: draft ? "partyProgramStatusDraft" : "partyProgramStatusFinal"})
    const ariaLabel = intl.formatMessage({id: "partyProgramStatus"}, {status: label})
    return <span css={style} aria-label={ariaLabel}>{label}</span>
}

