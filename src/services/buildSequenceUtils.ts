import { TowerType, TowerKingdom } from "../definitions/enums"

interface BuildSequenceQueryResult {
    buildSequenceId: Number
    kingdom: TowerKingdom
    towerType: TowerType
    level4Id: Number
    l4Name: String
    l4BuildCost: Number
    l4ImageUrl: String
    level3Id: Number
    l3Name: String
    l3BuildCost: Number
    l3ImageUrl: String
    level2Id: Number
    l2Name: String
    l2BuildCost: Number
    l2ImageUrl: String
    level1Id: Number
    l1Name: String
    l1BuildCost: Number
    l1ImageUrl: String
    totalBuildCost: Number
    totalAbilitiesCost: Number
    totalBuildCostFullyUpgraded: Number
}

export const convertToBuildSequenceShape = (results: BuildSequenceQueryResult[]) =>
    results.map(entry => {
        console.log(entry)
        const {
            buildSequenceId,
            kingdom,
            towerType,
            totalAbilitiesCost,
            totalBuildCost,
            totalBuildCostFullyUpgraded,
        } = entry
        return {
            buildSequenceId,
            kingdom,
            towerType,
            totalBuildCost,
            totalAbilitiesCost,
            totalBuildCostFullyUpgraded,
            level1: {
                name: entry.l1Name,
                id: entry.level1Id,
                buildCost: entry.l1BuildCost,
                imageUrl: entry.l1ImageUrl,
            },
            level2: {
                name: entry.l2Name,
                id: entry.level2Id,
                buildCost: entry.l2BuildCost,
                imageUrl: entry.l2ImageUrl,
            },
            level3: {
                name: entry.l3Name,
                id: entry.level3Id,
                buildCost: entry.l3BuildCost,
                imageUrl: entry.l3ImageUrl,
            },
            level4: {
                name: entry.l4Name,
                id: entry.level4Id,
                buildCost: entry.l4BuildCost,
                imageUrl: entry.l4ImageUrl,
            },
        }
    })
