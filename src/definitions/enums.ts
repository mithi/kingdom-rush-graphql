import { registerEnumType } from "type-graphql"

export enum TowerType {
    ARCHER = "archer",
    BARRACKS = "barracks",
    MAGE = "mage",
    ARTILLERY = "artillery",
}

export enum AttackTowerType {
    ARCHER = "archer",
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

export enum TowerSortColumn {
    name = `"Towers".name`,
    kingdom = `kingdom`,
    towerType = `"towerType"`,
    level = `level`,
    id = `"Towers".id`,
    buildCost = `"buildCost"`,
    damageMinimum = `"damageMinimum"`,
    damageMaximum = `"damageMaximum"`,
}

export enum AttackTowerSortColumn {
    name = `"Towers".name`,
    kingdom = `kingdom`,
    towerType = `"towerType"`,
    level = `level`,
    id = `"Towers".id`,
    buildCost = `"buildCost"`,
    damageMinimum = `"damageMinimum"`,
    damageMaximum = `"damageMaximum"`,
    fireInterval = `"fireInterval"`,
    range = `range`,
}

export enum BarracksTowerSortColumn {
    name = `"Towers".name`,
    kingdom = `kingdom`,
    level = `level`,
    id = `"Towers".id`,
    buildCost = `"buildCost"`,
    damageMinimum = `"damageMinimum"`,
    damageMaximum = `"damageMaximum"`,
    numberOfUnits = `"numberOfUnits"`,
    armor = `armor`,
    health = `health`,
    respawnInterval = `"respawnInterval"`,
}

export enum AbilitySortColumn {
    towerName = `"towerName"`,
    abilityName = `"abilityName"`,
    totalCost = `"totalCost"`,
    totalCostWithTowers = `"totalCostWithTowers"`,
    kingdom = "kingdom",
    towerType = `"towerType"`,
}

export enum BuildSequenceSortColumn {
    towerName = "t4.name",
    towerType = `t4."towerType"`,
    kingdom = "t4.kingdom",
    totalBuildCost = `"totalBuildCost"`,
    totalAbilitiesCost = `"totalAbilitiesCost"`,
    totalBuildCostFullyUpgraded = `"totalBuildCostFullyUpgraded"`,
}

registerEnumType(SortOrder, { name: "SortOrder" })

registerEnumType(TowerSortColumn, { name: "TowerSortColumn" })
registerEnumType(AttackTowerSortColumn, { name: "AttackTowerSortColumn" })
registerEnumType(BarracksTowerSortColumn, { name: "BarracksTowerSortColumn" })
registerEnumType(AbilitySortColumn, { name: "AbilitySortColumn" })
registerEnumType(BuildSequenceSortColumn, { name: "BuildSequenceSortColumn" })

registerEnumType(TowerType, { name: "TowerType" })
registerEnumType(AttackTowerType, { name: "AttackTowerType" })
registerEnumType(TowerLevel, { name: "TowerLevel" })
registerEnumType(TowerKingdom, { name: "TowerKingdom" })
