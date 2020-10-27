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
import { getRepository, createQueryBuilder } from "typeorm"
import { Resolver, Query, Args } from "type-graphql"
import { Tower } from "../models/Tower"
import {
    AttackTower,
    BarracksTower,
    TowerWithStats,
    AttackTowerArgs,
    BarracksTowerArgs,
    TowerArgs,
    AllowedSortDefinitionElement,
    FilterableEnums,
    BuildQueryArgs,
} from "../enums/definitions"
import { TowerType } from "../enums/TowerEnums"

const DB_NAME = process.env.NODE_ENV === "test" ? "test" : "default"

export const buildSortExpression = (sortDefinition: AllowedSortDefinitionElement[]) =>
    sortDefinition.map(sortRow => `${sortRow.column} ${sortRow.sortOrder}`).join(", ")

export const buildFilterExpression = (
    enums: FilterableEnums[],
    listType: string
): string =>
    Array.from(new Set(enums))
        .map(e => `${listType} = '${e}'`)
        .join(" OR ")

const buildQueryExpression = (
    {
        skip,
        take,
        onlyLevels,
        onlyKingdoms,
        onlyTowerTypes,
        sortDefinition,
    }: BuildQueryArgs,
    tableExpr: string
): string => {
    const levels = buildFilterExpression(onlyLevels, `level`)
    const kingdoms = buildFilterExpression(onlyKingdoms, `kingdom`)
    const towerTypes = buildFilterExpression(onlyTowerTypes, `"towerType"`)
    // TODO: Add check to make sure all elements of the array sortDefinition have unique columns
    const sortColumns = buildSortExpression(sortDefinition)

    const filterExpr = `WHERE (${levels}) AND (${kingdoms}) AND (${towerTypes})`
    const sortExpr = `ORDER BY ${sortColumns}`
    const pageExpr = `LIMIT ${take} OFFSET ${skip}`
    const queryExpression = `SELECT * FROM ${tableExpr} ${filterExpr} ${sortExpr} ${pageExpr}`
    console.log(queryExpression)
    return queryExpression
}

const nothingLeft = (args: BuildQueryArgs): boolean => {
    const { onlyLevels, onlyTowerTypes, onlyKingdoms } = args
    // We have filtered out all options that we know the query won't result anything
    return [onlyLevels, onlyTowerTypes, onlyKingdoms].every(list => list.length === 0)
}

@Resolver()
export class TowerResolver {
    @Query(() => [TowerWithStats])
    async towers(@Args() towerArgs: TowerArgs) {
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

    @Query(() => [AttackTower])
    async attackTowers(@Args() attackTowerArgs: AttackTowerArgs) {
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

    @Query(() => [BarracksTower])
    async barracksTowers(@Args() barracksTowerArgs: BarracksTowerArgs) {
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
