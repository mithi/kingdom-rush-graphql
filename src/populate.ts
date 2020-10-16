import { getRepository } from "typeorm"
import { Tower } from "./entity/Tower"
import { TowerType, TowerLevel, TowerKingdom } from "./enums/TowerEnums"

const path: any = require("path")
const pathToJson = path.join(__dirname, "../data/generated", "towers.json")
const towerJson: any = require(pathToJson)

type towerData = {
    name: string
    kingdom:
        | "kingdom rush vengeance"
        | "kingdom rush origin"
        | "kingdom rush"
        | "kingdom rush frontiers"
    level: 1 | 2 | 3 | 4
    towerType: "magic" | "artillery" | "ranged" | "barracks"
    buildCost: number
    damage: {
        minimum: number
        maximum: number
    }
}

const mapStringToKingdom = {
    "kingdom rush vengeance": TowerKingdom.KRV,
    "kingdom rush origin": TowerKingdom.KRO,
    "kingdom rush frontiers": TowerKingdom.KRF,
    "kingdom rush": TowerKingdom.KR,
}

const mapIntToLevel = {
    1: TowerLevel.LVL1,
    2: TowerLevel.LVL2,
    3: TowerLevel.LVL3,
    4: TowerLevel.LVL4,
}

const mapStringToTowerType = {
    barracks: TowerType.BARRACKS,
    magic: TowerType.MAGE,
    ranged: TowerType.ARCHER,
    artillery: TowerType.ARTILLERY,
}

const populateTowers = async () => {
    const towers: [towerData] = (<any>towerJson).towers
    for (let tower of towers) {
        try {
            console.log(
                tower.name,
                tower.kingdom,
                tower.level,
                tower.towerType,
                tower.buildCost,
                tower.damage
            )

            const newTower = {
                name: tower.name,
                towerType: mapStringToTowerType[tower.towerType],
                level: mapIntToLevel[tower.level],
                kingdom: mapStringToKingdom[tower.kingdom],
            }

            await getRepository(Tower).insert(newTower)
        } catch (error) {
            console.log("ERROR START")
            console.log("ErrorName:", error.name)
            console.log("ErrorMessage:", error.message)
            console.log("ErrorDetails:", error.detail)
            console.log("ERROR END")
        }
    }
}

export default populateTowers
