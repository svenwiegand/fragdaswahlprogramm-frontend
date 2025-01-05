import {maxNumberOfPartiesPerQuestion, parties, Party, partySymbols} from "../common/parties.ts"
import {useCallback, useState} from "react"
import {css} from "@emotion/react"
import {color, rempx} from "../style/styles.ts"
import {SendButton} from "./SendButton.tsx"

const gap = rempx(16)

const selectorStyle = css`
    display: flex;
    flex-wrap: wrap;
    gap: ${gap};
    justify-content: center;
`

const buttonContainerStyle = css`
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const partyButtonSelectedStyle = css`
    width: ${rempx(160)};
    height: ${rempx(80)};
    box-sizing: border-box;
    padding: ${rempx(16)};
    border: 1px solid #000;
    border-radius: ${rempx(8)};

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`
const partyButtonUnselectedStyle = css`
    ${partyButtonSelectedStyle};
    border-color: ${color.neutral.neutral400}
`
const partyButtonReadOnlyStyle = css`
    ${partyButtonSelectedStyle};
    cursor: default;
`

const logoSelectedStyle = css`
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    object-fit: contain;
`
const logoUnselectedStyle = css`
    ${logoSelectedStyle};
    filter: grayscale(100%);
    opacity: 0.7;
`

export type PartySelectorProps = {
    onSelect?: (parties: Party[]) => void
    readonly?: boolean
}

export function PartySelector({onSelect, readonly}: PartySelectorProps) {
    const [selectedParties, setSelectedParties] = useState<Party[]>([])
    const onSelectParty = (party: Party, isSelected: boolean) => {
        setSelectedParties(prevState => {
            if (isSelected) {
                return [...prevState, party]
            } else {
                return prevState.filter(p => p !== party)
            }
        })
    }
    const allowSelectIfNotAlready = selectedParties.length < maxNumberOfPartiesPerQuestion
    const send = useCallback(() => onSelect ? onSelect(selectedParties) : {}, [onSelect, selectedParties])
    const canSend = selectedParties.length > 0 && selectedParties.length <= maxNumberOfPartiesPerQuestion

    return (
        <div css={selectorStyle}>
            {partySymbols.map((party) =>
                <PartyToggleButton
                    key={parties[party].symbol}
                    party={party}
                    allowSelectIfNotAlready={allowSelectIfNotAlready}
                    onSelect={onSelectParty}
                    readonly={readonly ?? false}
                />,
            )}
            {!readonly ?
                <div css={buttonContainerStyle}>
                    <SendButton disabled={!canSend} onClick={send}/>
                </div>
                : null
            }
        </div>
    )
}

export type PartyToggleButtonProps = {
    party: Party
    allowSelectIfNotAlready: boolean
    onSelect?: (party: Party, isSelected: boolean) => void
    readonly: boolean
}

function PartyToggleButton({party, onSelect, allowSelectIfNotAlready, readonly}: PartyToggleButtonProps) {
    const [isSelected, setIsSelected] = useState(false)
    const onClick = useCallback(() => {
        const select = !isSelected
        setIsSelected(select)
        if (onSelect) {
            onSelect(party, select)
        }
    }, [party, onSelect, isSelected])
    const partyButtonStyle = isSelected ? partyButtonSelectedStyle : partyButtonUnselectedStyle
    const logoStyle = isSelected || readonly ? logoSelectedStyle : logoUnselectedStyle
    const img = <img css={logoStyle} src={`/logos/${parties[party].symbol}.png`} alt={parties[party].name}/>

    return readonly
        ? <span css={partyButtonReadOnlyStyle}>{img}</span>
        : <button css={partyButtonStyle} onClick={onClick} aria-pressed={isSelected}
                  disabled={!isSelected && !allowSelectIfNotAlready}>{img}</button>
}