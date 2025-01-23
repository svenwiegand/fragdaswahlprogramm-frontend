export type Party = "afd" | "gruene" | "bsw" | "cdu-csu" | "fdp" | "linke" | "spd" |
    "diebasis" | "buendnis-deutschland" | "ssw" | "volt"
export type PartyProps = {
    name: string
    shortName?: string
    nameAsLogo?: boolean
    symbol: Party
    parliament?: boolean
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
        name: "Alternative für Deutschland",
        shortName: "AfD",
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
        shortName: "Grüne",
        symbol: "gruene",
        parliament: true,
        manifesto: {
            title: "Wahlprogramm von Bündnis 90/Die Grünen",
            url: "https://cms.gruene.de/uploads/assets/20241216_BTW25_Programmentwurf_DINA4_digital.pdf",
            pageOffset: 0,
            draft: true,
            website: "https://www.gruene.de/artikel/zusammen-wachsen",
            lastCheck: new Date("2025-01-21"),
        },
    },
    bsw: {
        name: "Bündnis Sarah Wagenknecht – Vernunft und Gerechtigkeit",
        shortName: "BSW",
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
        name: "Frei Demokratische Partei",
        shortName: "FDP",
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
        name: "Sozialdemokratische Partei Deutschlands",
        shortName: "SPD",
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


    "diebasis": {
        name: "Basisdemokratische Partei Deutschland",
        shortName: "dieBasis",
        symbol: "diebasis",
        manifesto: {
            title: "Wahlprogramm von dieBasis",
            url: "https://diebasis-partei.de/wp-content/uploads/2025/01/dieBasis-Programm-BTW-2025-final.pdf",
            pageOffset: 0,
            draft: false,
            website: "https://diebasis-partei.de/bundestagswahl-2025/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "buendnis-deutschland": {
        name: "Bündnis Deutschland",
        symbol: "buendnis-deutschland",
        manifesto: {
            title: "Wahlprogramm vom Bündnis Deutschland",
            url: "https://buendnis-deutschland.de/wp-content/uploads/2025/01/btw25-a5-final-einzelseiten-final.pdf",
            pageOffset: 0,
            draft: false,
            website: "https://buendnis-deutschland.de/btw2025/",
            lastCheck: new Date("2025-01-21"),
        },
    },
    "ssw": {
        name: "Südschleswigscher Wählerverband",
        shortName: "SSW",
        symbol: "ssw",
        manifesto: {
            title: "Wahlprogramm vom SSW",
            url: "https://www.ssw.de/fileadmin/user_upload/daten/aktuelles/2025/BTW25/SSW-Wahlprogramm_BTW_2025.pdf",
            pageOffset: 0,
            draft: false,
            website: "https://www.ssw.de/bundestagswahl",
            lastCheck: new Date("2025-01-23"),
        },
    },
    volt: {
        name: "Volt Deutschland",
        shortName: "Volt",
        symbol: "volt",
        manifesto: {
            title: "Wahlprogramm von Volt",
            url: "https://voltdeutschland.org/storage/assets-btw25/volt-programm-bundestagswahl-2025.pdf",
            pageOffset: 0,
            draft: false,
            website: "https://voltdeutschland.org/programm/programme/programme-positionen",
            lastCheck: new Date("2025-01-21"),
        },
    },
}
export const partySymbols: Party[] = Object.keys(parties) as Party[]

export type PartyWithoutProgramProps = {
    name: string
    shortName?: string
    symbol: string
    parliament?: boolean
    manifesto: {
        website?: string
        lastCheck: Date
    }
}
export const partiesWithoutProgram: Record<string, PartyWithoutProgramProps> = {
    "volksabstimmung": {
        name: "Ab jetzt…Demokratie durch Volksabstimmung",
        shortName: "Volksabstimmung",
        symbol: "volksabstimmung",
        manifesto: {
            lastCheck: new Date("2025-01-23"),
        },
    },
    "bayernpartei": {
        name: "Bayernpartei",
        shortName: "BP",
        symbol: "bayernpartei",
        manifesto: {
            website: "https://bayernpartei.de/unterschriftenformular/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "buendnis-c": {
        name: "Bündnis C",
        symbol: "buendnis-c",
        manifesto: {
            website: "https://buendnis-c.de/bundestagswahl-2025/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "bueso": {
        name: "Bürgerrechtsbewegung Solidarität",
        shortName: "BüSo",
        symbol: "bueso",
        manifesto: {
            website: "https://www.bueso.de/",
            lastCheck: new Date("2025-01-23"),
        }
    },
    "csc": {
        name: "Cannabis Social Club",
        shortName: "CSC",
        symbol: "csc",
        manifesto: {
            website: "https://cscpartei.de/bundestagswahl-2025-1/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "dava": {
        name: "Demokratische Allianz für Vielfalt und Aufbruch",
        shortName: "DAVA",
        symbol: "dava",
        manifesto: {
            website: "https://dava-eu.org/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "dra": {
        name: "Dr. Ansay Partei",
        shortName: "DrA",
        symbol: "dra",
        manifesto: {
            website: "https://dransay-partei.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "freie-sachsen": {
        name: "Freie Sachsen",
        symbol: "freie-sachsen",
        manifesto: {
            website: "https://freie-sachsen.info/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "freie-waehler": {
        name: "Freie Wähler",
        symbol: "freie-waehler",
        parliament: true,
        manifesto: {
            website: "https://www.freiewaehler.eu/",
            lastCheck: new Date("2025-01-21"),
        },
    },
    "gartenpartei": {
        name: "Gartenpartei",
        symbol: "gartenpartei",
        manifesto: {
            website: "https://gartenpartei.eu/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "gerechtigkeitspartei": {
        name: "Die Gerechtigkeitspartei",
        symbol: "gerechtigkeitspartei",
        manifesto: {
            website: "https://www.diegerechtigkeitspartei.de/btw25",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "ld": {
        name: "Liberale Demokration – Die Sozialliberalen",
        shortName: "LD",
        symbol: "ld",
        manifesto: {
            website: "https://liberale-demokraten.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "liebe": {
        name: "Die LIEBE Europäische Partei",
        shortName: "Die LIEBE",
        symbol: "liebe",
        manifesto: {
            lastCheck: new Date("2025-01-23"),
        },
    },
    "menschliche-welt": {
        name: "Menschliche Welt",
        symbol: "menschliche-welt",
        manifesto: {
            website: "https://www.menschlichewelt.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "mera25": {
        name: "MERA25 - Gemeinsam für Europäische Unabhängigkeit",
        shortName: "MERA25",
        symbol: "mera25",
        manifesto: {
            website: "https://mera25.de/btw/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "mlpd": {
        name: "Marxistisch-Leninistische Partei Deutschlands",
        shortName: "MLPD",
        symbol: "mlpd",
        manifesto: {
            website: "https://www.mlpd.de/",
            lastCheck: new Date("2025-01-23"),
        }
    },
    "neue-mitte": {
        name: "DIE NEUE MITTE",
        symbol: "neue-mitte",
        manifesto: {
            lastCheck: new Date("2025-01-23"),
        },
    },
    "oedp": {
        name: "Ökologisch-Demokratische Partei",
        shortName: "ÖDP",
        symbol: "oedp",
        manifesto: {
            website: "https://www.oedp.de/wahlen/bundestagswahl-2025",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "die-partei": {
        name: "Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative",
        shortName: "die PARTEI",
        symbol: "die-partei",
        manifesto: {
            website: "https://www.die-partei.de/btw25/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "pdf": {
        name: "Partei des Fortschritts",
        shortName: "PdF",
        symbol: "pdf",
        manifesto: {
            website: "https://partei-des-fortschritts.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "verjuengung": {
        name: "Partei für Verjüngungsforschung",
        shortName: "Verjüngungsforschung",
        symbol: "verjuengung",
        manifesto: {
            website: "https://verjuengungsforschung.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "tierschutzpartei": {
        name: "Partei Mensch Umwelt Tierschutz",
        shortName: "Tierschutzpartei",
        symbol: "tierschutzpartei",
        manifesto: {
            website: "https://www.tierschutzpartei.de/btw2025/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "pdh": {
        name: "Partei der Humanisten",
        shortName: "PdH",
        symbol: "pdh",
        manifesto: {
            website: "https://www.pdh.eu/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "piraten": {
        name: "Piratenpartei Deutschland",
        shortName: "Piraten",
        symbol: "piraten",
        manifesto: {
            website: "https://www.piratenpartei.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "sgp": {
        name: "Sozialistische Gleichheitspartei, Vierte Internationale",
        shortName: "SGP",
        symbol: "sgp",
        manifesto: {
            website: "https://www.gleichheit.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "sonstige": {
        name: "DIE SONSTIGEN",
        shortName: "sonstige",
        symbol: "sonstige",
        manifesto: {
            website: "https://sonstige.noblogs.org/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "unabhaengige": {
        name: "UNABHÄNGIGE für bürgernahe Demokratie",
        shortName: "UNABHÄNGIGE",
        symbol: "unabhaengige",
        manifesto: {
            website: "",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "vpartei3": {
        name: "V-Partei³ - Partei für Veränderung, Vegetarier und Veganer",
        shortName: "V-Partei³",
        symbol: "vpartei3",
        manifesto: {
            website: "https://v-partei.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
    "werteunion": {
        name: "WerteUnion",
        symbol: "werteunion",
        manifesto: {
            website: "https://werteunion.de/",
            lastCheck: new Date("2025-01-23"),
        },
    },
}