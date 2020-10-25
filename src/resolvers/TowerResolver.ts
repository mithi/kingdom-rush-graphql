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
import { Resolver, Query, ArgsType, InputType, Args, Field } from "type-graphql"
import { Tower } from "../models/Tower"
import {
    TowerType,
    TowerKingdom,
    TowerLevel,
    SortOrder,
    TowerColumn,
} from "../enums/TowerEnums"
import { TowerWithStats, BaseTowerArgs, allTowerTypes } from "./shared"

@InputType()
export class SortDefinitionElement {
    @Field(_type => TowerColumn)
    column: TowerColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder
}

@ArgsType()
class TowerArgs extends BaseTowerArgs {
    @Field(_type => [TowerType], {
        defaultValue: allTowerTypes,
    })
    onlyTowerTypes: TowerType[]

    @Field(_type => [SortDefinitionElement], {
        defaultValue: [{ column: TowerColumn.id, sortOrder: SortOrder.ASCEND }],
    })
    sortDefinition: SortDefinitionElement[]
}

type filterableEnums = TowerLevel | TowerKingdom | TowerType

const createFilter = (enums: filterableEnums[], listType: string): string => {
    return Array.from(new Set(enums))
        .map(e => `${listType} = '${e}'`)
        .join(" OR ")
}

const sortExpression = (sortDefinition: SortDefinitionElement[]) => {
    return sortDefinition
        .map(sortRow => `${sortRow.column} ${sortRow.sortOrder}`)
        .join(", ")
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
}
