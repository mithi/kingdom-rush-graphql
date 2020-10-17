import { getRepository } from "typeorm"
import { KingdomType, logError } from "./shared"
import { BarracksStats } from "../models/BarracksStats"
import { Tower } from "../models/Tower"
const path: any = require("path")

const pathToBarracksJson = path.join(
    __dirname,
    "../../data/generated",
    "barracks-stats.json"
)

const barracksJson: any = require(pathToBarracksJson)

type BarracksData = {
    name: string
    kingdom: KingdomType
    numberOfUnits: number
    health: number
    armor: number
    respawnInterval: number
}

const populateBarracksStats = async () => {
    const barracks: [BarracksData] = (<any>barracksJson).towers
    for (let tower of barracks) {
        console.log("---")
        console.log(tower.name, tower.kingdom)
        let retrievedTower = await getRepository(Tower).findOne({
            where: {
                name: tower.name,
                kingdom: tower.kingdom,
            },
            relations: ["barracksStats"],
        })

        if (!retrievedTower) {
            console.log("> The tower you want to populate attack stats does not exist.")
            continue
        }

        if (retrievedTower.barracksStats) {
            console.log("> This tower already has barrack stats.")
            continue
        }

        let barracksStats = new BarracksStats()
        barracksStats.numberOfUnits = tower.numberOfUnits
        barracksStats.health = tower.health
        barracksStats.respawnInterval = tower.respawnInterval
        barracksStats.armor = tower.armor
        retrievedTower.barracksStats = barracksStats

        try {
            await getRepository(Tower).save(retrievedTower)
            console.log("Barracks stats saved.")
        } catch (error) {
            logError(error)
        }
    }
}

export default populateBarracksStats
