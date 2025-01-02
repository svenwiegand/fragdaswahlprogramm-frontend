export type Party = "afd" | "cdu-csu" | "fdp" | "gruene" | "spd"
type PartyProps = {
    name: string
    symbol: string
    manifestoTitle: string
    manifestoLink: string
}
export const parties: Record<Party, PartyProps> = {
    afd: {name: "AfD", symbol: "afd", manifestoTitle: "Wahlprogramm der AfD", manifestoLink: "https://www.afd.de/wahlprogramm/"},
    "cdu-csu": {name: "CDU/CSU", symbol: "cdu-csu", manifestoTitle: "Wahlprogramm von CDU und CSU", manifestoLink: "https://www.cdu.de/themen"},
    fdp: {name: "FDP", symbol: "fdp", manifestoTitle: "Wahlprogramm der FDP", manifestoLink: "https://www.fdp.de/positionen"},
    gruene: {name: "Bündnis 90/Die Grünen", symbol: "gruene", manifestoTitle: "Wahlprogramm von Bündnis 90/Die Grünen", manifestoLink: "https://www.gruene.de/themen"},
    spd: {name: "SPD", symbol: "spd", manifestoTitle: "Wahlprogramm der SPD", manifestoLink: "https://www.spd.de/standpunkte"},
}