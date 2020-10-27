import { getRepository } from "typeorm"
import {
    AttackTower,
    BarracksTower,
    TowerWithStats,
    AttackTowerArgs,
    BarracksTowerArgs,
    TowerArgs,
} from "../definitions"
import { TowerType } from "../definitions/TowerEnums"
import { Tower } from "../models/Tower"
import { nothingLeft, buildQueryExpression } from "./utils"
const DB_NAME = process.env.NODE_ENV === "test" ? "test" : "default"

export class TowerService {
    async towers(towerArgs: TowerArgs) {
        if (nothingLeft(towerArgs)) {
            return []
        }

        const tableExpression = `"Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId"`
        const queryExpression = buildQueryExpression(towerArgs, tableExpression)

        const result: TowerWithStats[] = await getRepository(Tower, DB_NAME).query(
            queryExpression
        )
        return result.map(tower => ({ ...tower, level: Number(tower.level) }))
    }

    async attackTowers(attackTowerArgs: AttackTowerArgs) {
        if (nothingLeft(attackTowerArgs)) {
            return []
        }

        const tableExpression = `"Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" INNER JOIN attack_stats ON main_stats."towerId" = attack_stats."towerId"`
        const queryExpression = buildQueryExpression(attackTowerArgs, tableExpression)
        const result: AttackTower[] = await getRepository(Tower, DB_NAME).query(
            queryExpression
        )
        return result.map(tower => ({ ...tower, level: Number(tower.level) }))
    }

    async barracksTowers(barracksTowerArgs: BarracksTowerArgs) {
        const buildQueryArgs = {
            ...barracksTowerArgs,
            onlyTowerTypes: [TowerType.BARRACKS],
        }

        if (nothingLeft(buildQueryArgs)) {
            return []
        }

        const tableExpression = `"Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" INNER JOIN barracks_stats ON main_stats."towerId" = barracks_stats."towerId"`
        const queryExpression = buildQueryExpression(buildQueryArgs, tableExpression)
        const result: BarracksTower[] = await getRepository(Tower, DB_NAME).query(
            queryExpression
        )
        return result.map(tower => ({ ...tower, level: Number(tower.level) }))
    }
}
