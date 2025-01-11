import {
    partyAgnosticSuggestions,
    partySearchSuggestions,
    partySpecificSuggestions,
} from "../content/suggestions.ts"
import {Suggestions} from "./Suggestion.tsx"
import {useEffect, useState} from "react"

export function InitialSuggestions({reload, onClick}: {reload?: boolean, onClick: (suggestion: string) => void}) {
    const [suggestions, setSuggestions] = useState(getSuggestions())
    useEffect(() => {
        if (reload) {
            setSuggestions(getSuggestions())
        }
    }, [reload])

    return (
        <Suggestions suggestions={suggestions} onClick={onClick} style={{maxWidth: 640}}/>
    )

}

function getSuggestions(): string[] {
    const general = randomNumbers(2, partyAgnosticSuggestions.length).map(i => partyAgnosticSuggestions[i])
    const specific = randomNumbers(1, partySpecificSuggestions.length).map(i => partySpecificSuggestions[i])
    const search = randomNumbers(1, partySearchSuggestions.length).map(i => partySearchSuggestions[i])
    return [...general, ...specific, ...search].map(suggestion => suggestion.question)
}

function randomNumbers(n: number, upperExclusive: number): number[] {
    const numbers = new Set<number>()
    while (numbers.size < n) {
        numbers.add(Math.floor(Math.random() * upperExclusive))
    }
    return Array.from(numbers)
}