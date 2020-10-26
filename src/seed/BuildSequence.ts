/*
--------
IMPORTANT
--------
This is not a good way to seed the database. Please see `src/seed/index.ts` for more information
*/

import { getRepository } from "typeorm"
import { KingdomType, JSON_DATA_PATH } from "./shared"
import { BuildSequence } from "../models/BuildSequence"
import { mapStringToKingdom } from "./Tower"
import { Tower } from "../models/Tower"
const path: any = require("path")
const pathToBuildSequenceJson = path.join(
    __dirname,
    JSON_DATA_PATH,
    "build-sequences.json"
)
const buildSequenceJson: any = require(pathToBuildSequenceJson)

type BuildSequenceData = {
    kingdom: KingdomType
    levels: string[]
}

const populateBuildSequence = async ({ dbName = "default", verbose = true } = {}) => {
    const buildSequencesData: BuildSequenceData[] = buildSequenceJson.buildSequences
    for (let buildSequenceData of buildSequencesData) {
        const kingdom = mapStringToKingdom[buildSequenceData.kingdom]
        const [l1, l2, l3, l4] = buildSequenceData.levels
        let retrievedTowers: Tower[] = await getRepository(Tower, dbName).find({
            where: [
                { name: l1, kingdom },
                { name: l2, kingdom },
                { name: l3, kingdom },
                { name: l4, kingdom },
            ],
        })

        console.log("...")
        console.log("BUILD SEQUENCE", buildSequenceData)
        console.log("RESULT", retrievedTowers)

        let buildSequence = new BuildSequence()
        retrievedTowers.forEach(tower => {
            if (tower.level === 1) {
                buildSequence.level1 = tower
                return
            }
            if (tower.level === 2) {
                buildSequence.level2 = tower
                return
            }
            if (tower.level === 3) {
                buildSequence.level3 = tower
                return
            }
            if (tower.level === 4) {
                buildSequence.level4 = tower
                return
            }
        })

        await buildSequence.save()
        if (verbose) {
            console.log("saved buildSequence", buildSequence)
        }
    }
}

export default populateBuildSequence
