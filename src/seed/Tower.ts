import { getRepository } from "typeorm"
import { logError, KingdomType } from "./shared"
import { TowerType, TowerLevel, TowerKingdom } from "../enums/TowerEnums"
import { MainStats } from "../models/MainStats"
import { Tower } from "../models/Tower"
const path: any = require("path")

const pathToTowerJson = path.join(__dirname, "../../data/generated", "towers.json")
const towerJson: any = require(pathToTowerJson)

type TowerData = {
    name: string
    kingdom: KingdomType
    level: 1 | 2 | 3 | 4
    towerType: "magic" | "artillery" | "ranged" | "barracks"
    buildCost: number
    damage: {
        minimum: number
        maximum: number
    }
}

const mapStringToKingdom = {
    "kingdom rush: vengeance": TowerKingdom.KRV,
    "kingdom rush: origin": TowerKingdom.KRO,
    "kingdom rush: frontiers": TowerKingdom.KRF,
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
    const towers: [TowerData] = (<any>towerJson).towers
    for (let tower of towers) {
        console.log("...")
        console.log(tower.name, "|", tower.kingdom)
        const newTower = {
            name: tower.name,
            towerType: mapStringToTowerType[tower.towerType],
            level: mapIntToLevel[tower.level],
            kingdom: mapStringToKingdom[tower.kingdom],
        }

        let retrievedTower = await getRepository(Tower).findOne({
            where: {
                name: tower.name,
                kingdom: tower.kingdom,
            },
        })

        if (retrievedTower) {
            console.log("> This tower is already in the database.")
            continue
        }

        try {
            await getRepository(Tower).insert(newTower)
            console.log("> Tower saved.")
        } catch (error) {
            logError(error)
        }
    }
}

const populateMainStats = async () => {
    const towers: [TowerData] = (<any>towerJson).towers
    for (let tower of towers) {
        console.log("...")
        console.log(tower.name, "|", tower.kingdom)
        let retrievedTower = await getRepository(Tower).findOne({
            where: {
                name: tower.name,
                kingdom: tower.kingdom,
            },
            relations: ["mainStats"],
        })

        if (!retrievedTower) {
            console.log("> The tower you want to populate main stats does not exist")
            continue
        }

        if (retrievedTower.mainStats) {
            console.log("> This tower already has main stats.")
            continue
        }

        const mainStats = new MainStats()
        mainStats.buildCost = tower.buildCost
        mainStats.damageMinimum = tower.damage.minimum
        mainStats.damageMaximum = tower.damage.maximum
        retrievedTower.mainStats = mainStats
        try {
            await getRepository(Tower).save(retrievedTower)
            console.log("> Main stats saved")
        } catch (error) {
            logError(error)
        }
    }
}

export { populateMainStats, populateTowers }
