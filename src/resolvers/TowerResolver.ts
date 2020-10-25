/*
Towers(
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
    SortDefinitionElement,
    AttackSortDefinitionElement,
} from "./shared"
import { TowerType, TowerKingdom, TowerLevel, AttackTowerType } from "../enums/TowerEnums"

type allowedSortDefinitionElement = SortDefinitionElement | AttackSortDefinitionElement
type filterableEnums = TowerLevel | TowerKingdom | TowerType | AttackTowerType
type allowedTowerTypes = TowerType | AttackTowerType

interface buildQueryArgs {
    skip: number
    take: number
    onlyLevels: TowerLevel[]
    onlyKingdoms: TowerKingdom[]
    onlyTowerTypes: allowedTowerTypes[]
    sortDefinition: allowedSortDefinitionElement[]
}

export const sortExpression = (sortDefinition: allowedSortDefinitionElement[]) => {
    return sortDefinition
        .map(sortRow => `${sortRow.column} ${sortRow.sortOrder}`)
        .join(", ")
}

export const createFilter = (enums: filterableEnums[], listType: string): string => {
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
    }: buildQueryArgs,
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
    const queryExpression = `${tableExpr} ${filterExpr} ${sortExpr} ${pageExpr}`
    console.log(queryExpression)
    return queryExpression
}

@Resolver()
export class TowerResolver {
    @Query(() => [TowerWithStats])
    async towers(
        @Args()
        {
            skip,
            take,
            onlyLevels,
            onlyKingdoms,
            onlyTowerTypes,
            sortDefinition,
        }: TowerArgs
    ) {
        const hasNoElement =
            onlyLevels.length <= 0 ||
            onlyKingdoms.length <= 0 ||
            onlyTowerTypes.length <= 0

        if (hasNoElement) {
            return []
        }

        const tableExpr = `SELECT * FROM "Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId"`
        const queryExpression = buildQueryExpression(
            {
                skip,
                take,
                onlyLevels,
                onlyKingdoms,
                onlyTowerTypes,
                sortDefinition,
            },
            tableExpr
        )

        const dbName = process.env.NODE_ENV === "test" ? "test" : "default"
        const result: TowerWithStats[] = await getRepository(Tower, dbName).query(
            queryExpression
        )

        const cleanResult = result.map(tower => ({
            ...tower,
            level: Number(tower["level"]),
        }))
        return cleanResult
    }

    @Query(() => [AttackTower])
    async attackTowers(
        @Args()
        {
            skip,
            take,
            onlyLevels,
            onlyKingdoms,
            onlyTowerTypes,
            sortDefinition,
        }: AttackTowerArgs
    ) {
        const hasNoElement =
            onlyLevels.length <= 0 ||
            onlyKingdoms.length <= 0 ||
            onlyTowerTypes.length <= 0

        if (hasNoElement) {
            return []
        }

        const tableExpr = `SELECT * FROM "Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" INNER JOIN attack_stats ON main_stats."towerId" = attack_stats."towerId"`
        const queryExpression = buildQueryExpression(
            {
                skip,
                take,
                onlyLevels,
                onlyKingdoms,
                onlyTowerTypes,
                sortDefinition,
            },
            tableExpr
        )

        const dbName = process.env.NODE_ENV === "test" ? "test" : "default"
        const result: AttackTower[] = await getRepository(Tower, dbName).query(
            queryExpression
        )

        const cleanResult = result.map(tower => ({
            ...tower,
            level: Number(tower["level"]),
        }))
        return cleanResult
    }
}
