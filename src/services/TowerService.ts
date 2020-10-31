import { getRepository } from "typeorm"
import {
    AttackTower,
    BarracksTower,
    TowerWithStats,
    AttackTowerArgs,
    BarracksTowerArgs,
    TowerArgs,
} from "../definitions"

import { TowerVerbose, TowerWithNullableFields } from "../definitions/objects"
import { TowerLevel, TowerType } from "../definitions/enums"
import { Tower } from "../models/Tower"
import { nothingLeft, buildQueryExpression as buildQuery } from "./utils"
import { AbilityService } from "./AbilityService"
import { BuildSequenceService } from "./BuildSequenceService"

const DB_NAME = process.env.NODE_ENV === "test" ? "test" : "default"
const getTowerRepo = () => getRepository(Tower, DB_NAME)

export class TowerService {
    async towers(args: TowerArgs) {
        if (nothingLeft(args)) {
            return []
        }

        const table = `"Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId"`
        const query = buildQuery(args, table)
        const result: Tower[] = await getTowerRepo().query(query)
        return result.map(tower => ({ ...tower, level: Number(tower.level) }))
    }

    async attackTowers(attackTowerArgs: AttackTowerArgs) {
        if (nothingLeft(attackTowerArgs)) {
            return []
        }

        const table = `"Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" INNER JOIN attack_stats ON main_stats."towerId" = attack_stats."towerId"`
        const query = buildQuery(attackTowerArgs, table)
        const result: AttackTower[] = await getTowerRepo().query(query)
        return result.map(tower => ({ ...tower, level: Number(tower.level) }))
    }

    async barracksTowers(args: BarracksTowerArgs) {
        const buildQueryArgs = {
            ...args,
            onlyTowerTypes: [TowerType.BARRACKS],
        }

        if (nothingLeft(buildQueryArgs)) {
            return []
        }

        const table = `"Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" INNER JOIN barracks_stats ON main_stats."towerId" = barracks_stats."towerId"`
        const query = buildQuery(buildQueryArgs, table)
        const result: BarracksTower[] = await getTowerRepo().query(query)
        return result.map(tower => ({ ...tower, level: Number(tower.level) }))
    }

    async towerById(id: Number) {
        /*
          1. get tower by id (towerWithStats)
          2. if towerType is barracks get barracks stats else get attack stats
          3. populate towerWithNullableFields accordingly
          4. if tower is level4, get abilities and get build sequence
          update accordingly
         */
        let query = `SELECT * FROM "Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" WHERE "Towers".id = ${id}`
        let results = await getTowerRepo().query(query)

        if (results.length === 0) {
            return null
        }

        const basicStats: TowerWithStats = results[0]
        let towerWithNullableFields: TowerWithNullableFields | null = null

        if (basicStats.towerType === TowerType.BARRACKS) {
            query = `SELECT * FROM "Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" INNER JOIN barracks_stats ON "Towers".id = barracks_stats."towerId" WHERE "Towers".id = ${id}`
            results = await getTowerRepo().query(query)

            if (results.length === 0) {
                return null
            }

            let towerStats: BarracksTower = results[0]
            towerWithNullableFields = { ...towerStats, level: Number(towerStats.level) }
        } else {
            query = `SELECT * FROM "Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" INNER JOIN attack_stats ON "Towers".id = attack_stats."towerId" WHERE "Towers".id = ${id}`
            results = await getTowerRepo().query(query)

            if (results.length === 0) {
                return null
            }
            let towerStats: AttackTower = results[0]
            towerWithNullableFields = { ...towerStats, level: Number(towerStats.level) }
        }

        if (Number(basicStats.level) !== TowerLevel.LVL4) {
            const towerVerbose: TowerVerbose = {
                allStats: towerWithNullableFields,
            }

            return towerVerbose
        }

        const towerVerbose: TowerVerbose = {
            allStats: towerWithNullableFields,
            abilities: await new AbilityService().abilitiesByTowerId(id),
            buildSequence: await new BuildSequenceService().buildSequenceByTowerId(id),
        }
        return towerVerbose
    }
}
