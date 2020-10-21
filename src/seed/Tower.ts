/*
--------
IMPORTANT
--------
This is not a good way to seed the database. Please see `src/seed/index.ts` for more information
*/

import { getRepository } from "typeorm"
import { logError, KingdomType } from "./shared"
import { TowerType, TowerLevel, TowerKingdom } from "../enums/TowerEnums"
import { MainStats, Tower, Ability, AbilityLevel } from "../models"

const path: any = require("path")

const pathToTowerJson = path.join(__dirname, "../../data/generated/json", "towers.json")
const pathToAbilityJson = path.join(
    __dirname,
    "../../data/generated/json",
    "abilities.json"
)

const towerJson: any = require(pathToTowerJson)
const abilityJson: any = require(pathToAbilityJson)

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

type AbilityLevelData = { cost: number }
type AbilityData = {
    abilityName: string
    description: string
    levels: AbilityLevelData[]
}

type TowerWithAbilityData = {
    towerName: "string"
    kingdom: KingdomType
    abilities: AbilityData[]
}

const mapStringToKingdom = {
    "kingdom rush: vengeance": TowerKingdom.KRV,
    "kingdom rush: origins": TowerKingdom.KRO,
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

const populateTowers = async ({ dbName = "default", verbose = true } = {}) => {
    const towers: [TowerData] = (<any>towerJson).towers
    for (let tower of towers) {
        if (verbose) {
            console.log("...")
            console.log(tower.name, "|", tower.kingdom)
        }
        const newTower = {
            name: tower.name,
            towerType: mapStringToTowerType[tower.towerType],
            level: mapIntToLevel[tower.level],
            kingdom: mapStringToKingdom[tower.kingdom],
        }

        let retrievedTower = await getRepository(Tower, dbName).findOne({
            where: {
                name: tower.name,
                kingdom: tower.kingdom,
            },
        })

        if (retrievedTower) {
            if (verbose) {
                console.log("> This tower is already in the database.")
            }
            continue
        }

        try {
            await getRepository(Tower, dbName).insert(newTower)
            if (verbose) {
                console.log("> Tower saved.")
            }
        } catch (error) {
            logError(error)
        }
    }
}

const populateMainStats = async ({ dbName = "default", verbose = true } = {}) => {
    const towers: [TowerData] = (<any>towerJson).towers
    for (let tower of towers) {
        if (verbose) {
            console.log("...")
            console.log(tower.name, "|", tower.kingdom)
        }
        let retrievedTower = await getRepository(Tower, dbName).findOne({
            where: {
                name: tower.name,
                kingdom: tower.kingdom,
            },
            relations: ["mainStats"],
        })

        if (!retrievedTower) {
            if (verbose) {
                console.log("> The tower you want to populate main stats does not exist")
            }
            continue
        }

        if (retrievedTower.mainStats) {
            if (verbose) {
                console.log("> This tower already has main stats.")
            }
            continue
        }

        const mainStats = new MainStats()
        mainStats.buildCost = tower.buildCost
        mainStats.damageMinimum = tower.damage.minimum
        mainStats.damageMaximum = tower.damage.maximum
        retrievedTower.mainStats = mainStats
        try {
            await getRepository(Tower, dbName).save(retrievedTower)
            if (verbose) {
                console.log("> Main stats saved")
            }
        } catch (error) {
            logError(error)
        }
    }
}

const populateAbilities = async ({ dbName = "default", verbose = true } = {}) => {
    const abilitiesTower: [TowerWithAbilityData] = abilityJson.data
    for (let tower of abilitiesTower) {
        let newTower = await getRepository(Tower, dbName).findOne({
            where: {
                name: tower.towerName,
                kingdom: tower.kingdom,
            },
            relations: ["abilities"],
        })

        if (verbose) {
            console.log("...")
            console.log(tower.towerName, tower.kingdom)
        }

        if (!newTower) {
            console.log(
                "can't save ability because associated tower doesn't exist in the database:",
                tower.towerName,
                tower.kingdom
            )
            continue
        }

        if (newTower.abilities.length !== 0) {
            if (verbose) {
                console.log(
                    "> This tower already has abilities.",
                    tower.towerName,
                    tower.kingdom,
                    newTower.abilities
                )
            }
            continue
        }

        for (let ability of tower.abilities) {
            console.log("--", ability.abilityName)

            let newAbility = new Ability()
            newAbility.name = ability.abilityName
            newAbility.description = ability.description
            newAbility.tower = newTower
            await getRepository(Ability, dbName).save(newAbility)

            ability.levels.forEach(async (level, i) => {
                let newAbilityLevel = new AbilityLevel()
                newAbilityLevel.cost = level.cost
                newAbilityLevel.level = i
                newAbilityLevel.ability = newAbility
                await getRepository(AbilityLevel, dbName).save(newAbilityLevel)
            })
        }
    }
}

export { populateMainStats, populateTowers, populateAbilities }
