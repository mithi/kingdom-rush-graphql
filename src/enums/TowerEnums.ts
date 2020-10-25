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
    KRO = "kingdom rush: origins",
    KRV = "kingdom rush: vengeance",
}

export enum SortOrder {
    ASCEND = "ASC",
    DESCEND = "DESC",
}

export enum TowerSortOrderColumn {
    name = "name",
    kingdom = "kingdom",
    towerType = "towerType",
    level = "level",
    id = "towerId",
    buildCost = "buildCost",
    damageMinimum = "damageMinimum",
    damageMaximum = "damageMaximum",
}

registerEnumType(SortOrder, { name: "SortOrder" })
registerEnumType(TowerSortOrderColumn, { name: "TowerSortOrderColumn" })
registerEnumType(TowerType, { name: "TowerType" })
registerEnumType(TowerLevel, { name: "TowerLevel" })
registerEnumType(TowerKingdom, { name: "TowerKingdom" })
