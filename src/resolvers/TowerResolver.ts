/*
towers(
    skip: 5,
    take: 10,
    onlyLevels: [1, 2, 3],
    onlyTypes: [BARRACKS, MAGE]
    onlyKingdoms: [KR, KRV],
    sortBy: [
        {column: "name", order: "ASCENDING"},
        {column: "kingdom", order: "ASCENDING"},
        {column: "towerType", order: "ASCENDING"},
        {column: "towerLevel", order: "ASCENDING"},
       {column: "id", order: "ASCENDING"},
        {column: "buildCost", order: "ASCENDING"},
        {column: "damageMinimum", order: "ASCENDING"},
        {column: "damageMaximum", order: "ASCENDING"},
    ]
)

attackTowers(
    skip: 5,
    take: 10,
    onlyLevels: [1, 2, 3],
    onlyTypes: [MAGE]
    onlyKingdoms: [KR, KRV],
    sortBy: [
        {column: "fireInterval", order: "ASCENDING"},
        {column: "range", order: "ASCENDING"},
        {column: "name", order: "ASCENDING"},
        {column: "kingdom", order: "ASCENDING"},
        {column: "towerType", order: "ASCENDING"},
        {column: "towerLevel", order: "ASCENDING"},
        {column: "id", order: "ASCENDING"},
        {column: "buildCost", order: "ASCENDING"},
        {column: "damageMinimum", order: "ASCENDING"},
        {column: "damageMaximum", order: "ASCENDING"},
    ]
)
 */
require("dotenv").config()
import { Resolver, Query, Args } from "type-graphql"
import {
    AttackTower,
    BarracksTower,
    TowerWithStats,
    AttackTowerArgs,
    BarracksTowerArgs,
    TowerArgs,
} from "../enums/definitions"

import { TowerService } from "../services/TowerService"

@Resolver()
export class TowerResolver {
    private towerService = new TowerService()

    @Query(() => [TowerWithStats])
    async towers(@Args() towerArgs: TowerArgs) {
        return this.towerService.towers(towerArgs)
    }

    @Query(() => [AttackTower])
    async attackTowers(@Args() attackTowerArgs: AttackTowerArgs) {
        return this.towerService.attackTowers(attackTowerArgs)
    }

    @Query(() => [BarracksTower])
    async barracksTowers(@Args() barracksTowerArgs: BarracksTowerArgs) {
        return this.towerService.barracksTowers(barracksTowerArgs)
    }
}
