/*
towers(
    skip: 5,
    take: 10,
    onlyLevels: [1, 2, 3],
    onlyTypes: [BARRACKS, MAGE]
    onlyKingdoms: [KR, KRV],
    sortDefinition: [
        {column: "name", order: ASCEND},
        {column: "kingdom", order: ASCEND},
        {column: "towerType", order: ASCEND},
        {column: "towerLevel", order: ASCEND},
        {column: "id", order: ASCEND},
        {column: "buildCost", order: ASCEND},
        {column: "damageMinimum", order: ASCEND},
        {column: "damageMaximum", order: ASCEND},
    ]
)

attackTowers(
    skip: 5,
    take: 10,
    onlyLevels: [1, 2, 3],
    onlyTypes: [MAGE]
    onlyKingdoms: [KR, KRV],
    sortDefinition: [
        {column: "fireInterval", order: ASCEND},
        {column: "range", order: ASCEND},
        {column: "name", order: ASCEND},
        {column: "kingdom", order: ASCEND},
        {column: "towerType", order: ASCEND},
        {column: "towerLevel", order: ASCEND},
        {column: "id", order: ASCEND},
        {column: "buildCost", order: ASCEND},
        {column: "damageMinimum", order: ASCEND},
        {column: "damageMaximum", order: ASCEND},
    ]
)

BarracksTowers(
    skip: 5,
    take: 10,
    onlyLevels: [1, 2, 3],
    onlyKingdoms: [KR, KRV],
    sortDefinition: [
        {column: "cooldown", order: ASCENDING},
        {column: "health", order: ASCENDING},
        {column: "armor", order: ASCENDING},
        {column: "numberOfUnits", order: ASCENDING},
        {column: "name", order: ASCENDING},
        {column: "kingdom", order: ASCENDING},
        {column: "towerType", order: ASCENDING},
        {column: "towerLevel", order: ASCENDING},
        {column: "id", order: ASCENDING},
        {column: "buildCost", order: ASCENDING},
        {column: "damageMinimum", order: ASCENDING},
        {column: "damageMaximum", order: ASCENDING},
    ]
)
 */
import { Resolver, Query, Args } from "type-graphql"
import {
    AttackTower,
    BarracksTower,
    TowerWithStats,
    AttackTowerArgs,
    BarracksTowerArgs,
    TowerArgs,
} from "../definitions"

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
