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
import { getRepository } from "typeorm"
import { Resolver, Query, Args } from "type-graphql"
import { Tower } from "../models/Tower"
import {
    AttackTower,
    TowerWithStats,
    AttackTowerArgs,
    TowerArgs,
    AllowedSortDefinitionElement,
    FilterableEnums,
    BuildQueryArgs,
} from "./shared"

const DB_NAME = process.env.NODE_ENV === "test" ? "test" : "default"

export const sortExpression = (sortDefinition: AllowedSortDefinitionElement[]) => {
    return sortDefinition
        .map(sortRow => `${sortRow.column} ${sortRow.sortOrder}`)
        .join(", ")
}

export const createFilter = (enums: FilterableEnums[], listType: string): string => {
    return Array.from(new Set(enums))
        .map(e => `${listType} = '${e}'`)
        .join(" OR ")
}

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
    const levels = createFilter(onlyLevels, `level`)
    const kingdoms = createFilter(onlyKingdoms, `kingdom`)
    const towerTypes = createFilter(onlyTowerTypes, `"towerType"`)
    // TODO: Add check to make sure all elements of the array sortDefinition have unique columns
    const sortColumns = sortExpression(sortDefinition)

    const filterExpr = `WHERE (${levels}) AND (${kingdoms}) AND (${towerTypes})`
    const sortExpr = `ORDER BY ${sortColumns}`
    const pageExpr = `LIMIT ${take} OFFSET ${skip}`
    const queryExpression = `SELECT * FROM ${tableExpr} ${filterExpr} ${sortExpr} ${pageExpr}`
    console.log(queryExpression)
    return queryExpression
}

const nothingLeft = (args: BuildQueryArgs): boolean => {
    const { onlyLevels, onlyTowerTypes, onlyKingdoms } = args
    // We have filtered out all options that the result doesn't contain anything
    return [onlyLevels, onlyTowerTypes, onlyKingdoms].every(list => list.length === 0)
}

@Resolver()
export class TowerResolver {
    @Query(() => [TowerWithStats])
    async towers(@Args() towerArgs: TowerArgs) {
        if (nothingLeft(towerArgs)) {
            return []
        }

        const tableExpr = `"Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId"`
        const queryExpression = buildQueryExpression(towerArgs, tableExpr)

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

        const tableExpr = `"Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" INNER JOIN attack_stats ON main_stats."towerId" = attack_stats."towerId"`
        const queryExpression = buildQueryExpression(attackTowerArgs, tableExpr)
        const result: AttackTower[] = await getRepository(Tower, DB_NAME).query(
            queryExpression
        )
        return result.map(tower => ({ ...tower, level: Number(tower.level) }))
    }
}
