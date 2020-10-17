import { getRepository } from "typeorm"
import { KingdomType, logError } from "./shared"
import { AttackStats } from "../models/AttackStats"
import { Tower } from "../models/Tower"
const path: any = require("path")
const pathToAttackJson = path.join(__dirname, "../../data/generated", "attack-stats.json")

const attackJson: any = require(pathToAttackJson)

type AttacksData = {
    name: string
    kingdom: KingdomType
    fireInterval: number
    range: number
}

const populateAttackStats = async () => {
    const attackTowers: [AttacksData] = attackJson.towers
    for (let tower of attackTowers) {
        console.log("---")
        console.log(tower.name, tower.kingdom)
        let retrievedTower = await getRepository(Tower).findOne({
            where: {
                name: tower.name,
                kingdom: tower.kingdom,
            },
            relations: ["attackStats"],
        })

        if (!retrievedTower) {
            console.log("> The tower you want to populate attack stats does not exist")
            continue
        }

        if (retrievedTower.attackStats) {
            console.log("> This tower already has attack stats")
            continue
        }

        let attackStats = new AttackStats()
        attackStats.fireInterval = tower.fireInterval
        attackStats.range = tower.range
        retrievedTower.attackStats = attackStats

        try {
            await getRepository(Tower).save(retrievedTower)
            console.log("> Attack stats saved.")
        } catch (error) {
            logError(error)
        }
    }
}

export default populateAttackStats
