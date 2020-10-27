/*
--------
IMPORTANT
--------
This is not a good way to seed the database. Please see `src/seed/index.ts` for more information
*/

import { getRepository } from "typeorm"
import { logError, KingdomType, JSON_DATA_PATH } from "./shared"
import { TowerType, TowerLevel, TowerKingdom } from "../enums/TowerEnums"
import { MainStats, Tower, Ability, AbilityLevel } from "../models"

const path: any = require("path")
const pathToTowerJson = path.join(__dirname, JSON_DATA_PATH, "towers.json")
const pathToAbilityJson = path.join(__dirname, JSON_DATA_PATH, "abilities.json")
const pathToImageUrlJson = path.join(__dirname, JSON_DATA_PATH, "image-urls.json")

const towerJson: any = require(pathToTowerJson)
const abilityJson: any = require(pathToAbilityJson)
const imageJson: any = require(pathToImageUrlJson)

type imageData = {
    imageUrl: string
    kingdom: string
    name: string
}

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

export const mapStringToKingdom = {
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

        const newTower = new Tower()
        newTower.name = tower.name
        newTower.towerType = mapStringToTowerType[tower.towerType]
        newTower.level = mapIntToLevel[tower.level]
        newTower.kingdom = mapStringToKingdom[tower.kingdom]

        const mainStats = new MainStats()
        mainStats.buildCost = tower.buildCost
        mainStats.damageMinimum = tower.damage.minimum
        mainStats.damageMaximum = tower.damage.maximum
        newTower.mainStats = mainStats

        try {
            await getRepository(Tower, dbName).save(newTower)

            if (verbose) {
                console.log("> Tower saved.")
            }
        } catch (error) {
            logError(error)
        }
    }
}

const populateImageUrls = async ({ dbName = "default", verbose = true } = {}) => {
    const towers: [imageData] = imageJson.data
    for (let tower of towers) {
        //console.log(tower.name, "|", tower.kingdom)
        let retrievedTower = await getRepository(Tower, dbName).findOne({
            where: {
                name: tower.name,
                kingdom: tower.kingdom,
            },
        })

        if (!retrievedTower) {
            console.log(
                "> The tower you want to populate with image urls does not exist",
                tower.name,
                tower.kingdom
            )
            continue
        }

        if (retrievedTower.imageUrl) {
            if (verbose) {
                console.log("> This tower already has an image url")
            }
            continue
        }

        retrievedTower.imageUrl = tower.imageUrl

        try {
            await getRepository(Tower, dbName).save(retrievedTower)
        } catch (error) {
            logError(error)
        }
    }
}

const populateAbilities = async ({ dbName = "default", verbose = true } = {}) => {
    const abilitiesTower: [TowerWithAbilityData] = abilityJson.data

    let countAbilityLevels = 0
    for (let tower of abilitiesTower) {
        let newTower = await getRepository(Tower, dbName).findOne({
            where: {
                name: tower.towerName,
                kingdom: tower.kingdom,
            },
            relations: ["abilities"],
        })

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
            let newAbility = new Ability()
            newAbility.name = ability.abilityName
            newAbility.description = ability.description
            newAbility.tower = newTower
            await getRepository(Ability, dbName).save(newAbility)

            let i = 0
            for (let level of ability.levels) {
                countAbilityLevels = countAbilityLevels + 1
                let newAbilityLevel = new AbilityLevel()
                newAbilityLevel.cost = level.cost
                newAbilityLevel.level = i
                i = i + 1
                newAbilityLevel.ability = newAbility
                try {
                    await getRepository(AbilityLevel, dbName).save(newAbilityLevel)
                    if (verbose) {
                        console.log(countAbilityLevels, "|", ability.abilityName, "|", i)
                    }
                } catch (e) {
                    logError(e)
                }
            }
        }
    }
}

export { populateTowers, populateAbilities, populateImageUrls }
