/*
--------
IMPORTANT
--------
This is not a good way to seed the database. Please see `src/seed/index.ts` for more information
*/

import { getRepository } from "typeorm"
import { KingdomType, logError, JSON_DATA_PATH } from "./shared"
import { BarracksStats } from "../models/BarracksStats"
import { Tower } from "../models/Tower"
const path: any = require("path")

const pathToBarracksJson = path.join(__dirname, JSON_DATA_PATH, "barracks-stats.json")

const barracksJson: any = require(pathToBarracksJson)

type BarracksData = {
    name: string
    kingdom: KingdomType
    numberOfUnits: number
    health: number
    armor: number
    respawnInterval: number
}

const populateBarracksStats = async ({ dbName = "default", verbose = true } = {}) => {
    const barracks: [BarracksData] = (<any>barracksJson).towers
    for (let tower of barracks) {
        if (verbose) {
            console.log("...")
            console.log(tower.name, "|", tower.kingdom)
        }

        let retrievedTower = await getRepository(Tower, dbName).findOne({
            where: {
                name: tower.name,
                kingdom: tower.kingdom,
            },
            relations: ["barracksStats"],
        })

        if (!retrievedTower) {
            console.log(
                "> The tower you want to populate barracks stats does not exist.",
                tower.name,
                tower.kingdom
            )
            continue
        }

        if (retrievedTower.barracksStats) {
            if (verbose) {
                console.log("> This tower already has barracks stats.")
            }
            continue
        }

        let barracksStats = new BarracksStats()
        barracksStats.numberOfUnits = tower.numberOfUnits
        barracksStats.health = tower.health
        barracksStats.respawnInterval = tower.respawnInterval
        barracksStats.armor = tower.armor
        retrievedTower.barracksStats = barracksStats

        try {
            await getRepository(Tower, dbName).save(retrievedTower)
            if (verbose) {
                console.log("Barracks stats saved.")
            }
        } catch (error) {
            logError(error)
        }
    }
}

export default populateBarracksStats
