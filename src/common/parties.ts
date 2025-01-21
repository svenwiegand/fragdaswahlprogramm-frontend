export type Party = "afd" | "gruene" | "bsw" | "cdu-csu" | "fdp" | "linke" | "spd" | "volt"
type PartyProps = {
    name: string
    symbol: string
    manifesto: {
        title: string
        url: string
        pageOffset: number
        draft: boolean
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
            draft: true,
        },
    },
    gruene: {
        name: "Bündnis 90/Die Grünen",
        symbol: "gruene",
        manifesto: {
            title: "Wahlprogramm von Bündnis 90/Die Grünen",
            url: "https://cms.gruene.de/uploads/assets/20241216_BTW25_Programmentwurf_DINA4_digital.pdf",
            pageOffset: 0,
            draft: true,
        },
    },
    bsw: {
        name: "Bündnis Sarah Wagenknecht",
        symbol: "bsw",
        manifesto: {
            title: "Wahlprogramm vom Bündnis Sarah Wagenknecht",
            url: "https://bsw-vg.de/wp-content/themes/bsw/assets/downloads/BSW%20Wahlprogramm%202025.pdf",
            pageOffset: 0,
            draft: false,
        }
    },
    "cdu-csu": {
        name: "CDU/CSU",
        symbol: "cdu-csu",
        manifesto: {
            title: "Wahlprogramm von CDU und CSU",
            url: "https://www.politikwechsel.cdu.de/wahlprogramm",
            pageOffset: 2,
            draft: false,
        },
    },
    fdp: {
        name: "FDP",
        symbol: "fdp",
        manifesto: {
            title: "Wahlprogramm der FDP",
            url: "https://www.fdp.de/sites/default/files/2024-12/fdp-wahlprogramm_2025.pdf",
            pageOffset: 1,
            draft: false,
        },
    },
    linke: {
        name: "Die Linke",
        symbol: "linke",
        manifesto: {
            title: "Wahlprogramm der Linken",
            url: "https://www.die-linke.de/fileadmin/1_Partei/parteitage/Au%C3%9Ferordentlicher_Parteitag_25/Wahlprogramm_Entwurf.pdf",
            pageOffset: 0,
            draft: true,
        }
    },
    spd: {
        name: "SPD",
        symbol: "spd",
        manifesto: {
            title: "Wahlprogramm der SPD",
            url: "https://mehr.spd.de/custom-static-assets/documents/Regierungsprogramm.pdf",
            pageOffset: 0,
            draft: true,
        },
    },
    volt: {
        name: "Volt",
        symbol: "volt",
        manifesto: {
            title: "Wahlprogramm von Volt",
            url: "https://voltdeutschland.org/storage/assets-btw25/volt-programm-bundestagswahl-2025.pdf",
            pageOffset: 0,
            draft: false,
        },
    }
}
export const partySymbols: Party[] = Object.keys(parties) as Party[]
export const maxNumberOfPartiesPerQuestion = 4