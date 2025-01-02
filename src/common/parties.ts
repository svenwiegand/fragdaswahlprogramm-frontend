export type Party = "afd" | "cdu-csu" | "fdp" | "gruene" | "spd"
type PartyProps = {
    name: string
    symbol: string
    manifesto: {
        title: string
        url: string
        pageOffset: number
    }
}
export const parties: Record<Party, PartyProps> = {
    afd: {
        name: "AfD",
        symbol: "afd",
        manifesto: {
            title: "Wahlprogramm der AfD",
            url: "https://www.bundestagswahl-bw.de/fileadmin/bundestagswahl-bw/2025/Wahlprogramme/AfD_Leitantrag-Bundestagswahlprogramm-2025.pdf",
            pageOffset: 0,
        },
    },
    "cdu-csu": {
        name: "CDU/CSU",
        symbol: "cdu-csu",
        manifesto: {
            title: "Wahlprogramm von CDU und CSU",
            url: "https://www.politikwechsel.cdu.de/wahlprogramm",
            pageOffset: 2,
        },
    },
    fdp: {
        name: "FDP",
        symbol: "fdp",
        manifesto: {
            title: "Wahlprogramm der FDP",
            url: "https://www.fdp.de/sites/default/files/2024-12/fdp-wahlprogramm_2025.pdf",
            pageOffset: 1,
        },
    },
    gruene: {
        name: "Bündnis 90/Die Grünen",
        symbol: "gruene",
        manifesto: {
            title: "Wahlprogramm von Bündnis 90/Die Grünen",
            url: "https://cms.gruene.de/uploads/assets/20241216_BTW25_Programmentwurf_DINA4_digital.pdf",
            pageOffset: 0,
        },
    },
    spd: {
        name: "SPD",
        symbol: "spd",
        manifesto: {
            title: "Wahlprogramm der SPD",
            url: "https://www.spd.de/fileadmin/Dokumente/Beschluesse/Programm/Entwurf_Regierungsprogramm_2025.pdf",
            pageOffset: 2,
        },
    },
}