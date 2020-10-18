import { registerEnumType } from "type-graphql"

export enum TowerType {
    ARCHER = "archer",
    BARRACKS = "barracks",
    MAGE = "mage",
    ARTILLERY = "artillery",
}

export enum TowerLevel {
    LVL1 = 1,
    LVL2 = 2,
    LVL3 = 3,
    LVL4 = 4,
}

export enum TowerKingdom {
    KR = "kingdom rush",
    KRF = "kingdom rush: frontiers",
    KRO = "kingdom rush: origin",
    KRV = "kingdom rush: vengeance",
}

registerEnumType(TowerType, { name: "TowerType" })
registerEnumType(TowerLevel, { name: "TowerLevel" })
registerEnumType(TowerKingdom, { name: "TowerKingdom" })
