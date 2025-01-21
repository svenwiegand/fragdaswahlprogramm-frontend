export type Party = "afd" | "gruene" | "buendnis-deutschland" | "bsw" | "cdu-csu" | "fdp" | "linke" | "spd" | "volt"
type PartyProps = {
    name: string
    symbol: Party
    parliament: boolean
    manifesto: {
        title: string
        url: string
        pageOffset: number
        draft: boolean
        website: string
        lastCheck: Date
    }
}
export const parties: Record<Party, PartyProps> = {
    afd: {
        name: "AfD",
        symbol: "afd",
        parliament: true,
        manifesto: {
            title: "Wahlprogramm der AfD",
            url: "https://www.bundestagswahl-bw.de/fileadmin/bundestagswahl-bw/2025/Wahlprogramme/AfD_Leitantrag-Bundestagswahlprogramm-2025.pdf",
            pageOffset: 0,
            draft: true,
            website: "https://www.afd.de/der-afd-programmentwurf-fuer-die-bundestagswahl-2025-ist-fertig/",
            lastCheck: new Date("2025-01-21"),
        },
    },
    gruene: {
        name: "Bündnis 90/Die Grünen",
        symbol: "gruene",
        parliament: true,
        manifesto: {
            title: "Wahlprogramm von Bündnis 90/Die Grünen",
            url: "https://cms.gruene.de/uploads/assets/20241216_BTW25_Programmentwurf_DINA4_digital.pdf",
            pageOffset: 0,
            draft: true,
            website: "https://www.gruene.de/artikel/zusammen-wachsenhttps://www.gruene.de/artikel/zusammen-wachsen",
            lastCheck: new Date("2025-01-21"),
        },
    },
    "buendnis-deutschland": {
        name: "Bündnis Deutschland",
        symbol: "buendnis-deutschland",
        parliament: false,
        manifesto: {
            title: "Wahlprogramm vom Bündnis Deutschland",
            url: "https://buendnis-deutschland.de/wp-content/uploads/2025/01/btw25-a5-final-einzelseiten-final.pdf",
            pageOffset: 0,
            draft: false,
            website: "https://buendnis-deutschland.de/btw2025/",
            lastCheck: new Date("2025-01-21"),
        },
    },
    bsw: {
        name: "Bündnis Sarah Wagenknecht",
        symbol: "bsw",
        parliament: true,
        manifesto: {
            title: "Wahlprogramm vom Bündnis Sarah Wagenknecht",
            url: "https://bsw-vg.de/wp-content/themes/bsw/assets/downloads/BSW%20Wahlprogramm%202025.pdf",
            pageOffset: 0,
            draft: false,
            website: "https://bsw-vg.de/",
            lastCheck: new Date("2025-01-21"),
        }
    },
    "cdu-csu": {
        name: "CDU/CSU",
        symbol: "cdu-csu",
        parliament: true,
        manifesto: {
            title: "Wahlprogramm von CDU und CSU",
            url: "https://www.politikwechsel.cdu.de/wahlprogramm",
            pageOffset: 2,
            draft: false,
            website: "https://www.politikwechsel.cdu.de/",
            lastCheck: new Date("2025-01-21"),
        },
    },
    fdp: {
        name: "FDP",
        symbol: "fdp",
        parliament: true,
        manifesto: {
            title: "Wahlprogramm der FDP",
            url: "https://www.fdp.de/sites/default/files/2024-12/fdp-wahlprogramm_2025.pdf",
            pageOffset: 1,
            draft: false,
            website: "https://www.fdp.de/das-wahlprogramm-der-freien-demokraten-zur-bundestagswahl-2025",
            lastCheck: new Date("2025-01-21"),
        },
    },
    linke: {
        name: "Die Linke",
        symbol: "linke",
        parliament: true,
        manifesto: {
            title: "Wahlprogramm der Linken",
            url: "https://www.die-linke.de/fileadmin/1_Partei/parteitage/Au%C3%9Ferordentlicher_Parteitag_25/Wahlprogramm_Entwurf.pdf",
            pageOffset: 0,
            draft: true,
            website: "https://www.die-linke.de/bundestagswahl-2025/wahlprogramm/",
            lastCheck: new Date("2025-01-21"),
        }
    },
    spd: {
        name: "SPD",
        symbol: "spd",
        parliament: true,
        manifesto: {
            title: "Wahlprogramm der SPD",
            url: "https://mehr.spd.de/custom-static-assets/documents/Regierungsprogramm.pdf",
            pageOffset: 0,
            draft: true,
            website: "https://www.spd.de/bundestagswahl",
            lastCheck: new Date("2025-01-21"),
        },
    },
    volt: {
        name: "Volt",
        symbol: "volt",
        parliament: false,
        manifesto: {
            title: "Wahlprogramm von Volt",
            url: "https://voltdeutschland.org/storage/assets-btw25/volt-programm-bundestagswahl-2025.pdf",
            pageOffset: 0,
            draft: false,
            website: "https://voltdeutschland.org/programm/programme/programme-positionenhttps://voltdeutschland.org/programm/programme/programme-positionen",
            lastCheck: new Date("2025-01-21"),
        },
    }
}
export const partySymbols: Party[] = Object.keys(parties) as Party[]

/*
type PartyWithoutProgramProps = {
    name: string
    symbol: string
    parliament: boolean
    manifesto: {
        website: string
        lastCheck: Date
    }
}
const partiesWithoutProgram: Record<string, PartyWithoutProgramProps> = {
    "freie-waehler": {
        name: "Freie Wähler",
        symbol: "freie-waehler",
        parliament: true,
        manifesto: {
            website: "https://www.freiewaehler.eu/",
            lastCheck: new Date("2025-01-21"),
        },
    }
}
*/