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
import { Resolver, Query, ArgsType, InputType, Args, Field, Int } from "type-graphql"
import { Tower } from "../models/Tower"
import {
    TowerType,
    TowerKingdom,
    TowerLevel,
    SortOrder,
    TowerColumn,
} from "../enums/TowerEnums"
import { Min, Max } from "class-validator"
import { TowerWithStats, allTowerKingdoms, allTowerLevels } from "./shared"

@InputType()
export class SortDefinitionElement {
    @Field(_type => TowerColumn)
    column: TowerColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder
}

@ArgsType()
class TowerArgs {
    @Field(_type => Int, { defaultValue: 0 })
    @Min(0)
    skip: number = 0

    @Field(_type => Int, { defaultValue: 104 })
    @Min(1)
    @Max(104)
    take: number = 104

    @Field(_type => [TowerLevel], {
        defaultValue: allTowerLevels,
    })
    onlyLevels: TowerLevel[]

    @Field(_type => [TowerKingdom], {
        defaultValue: allTowerKingdoms,
    })
    onlyKingdoms: TowerKingdom[]

    @Field(_type => [TowerType], {
        defaultValue: [
            TowerType.ARCHER,
            TowerType.BARRACKS,
            TowerType.ARTILLERY,
            TowerType.MAGE,
        ],
    })
    onlyTowerTypes: TowerType[]

    @Field(_type => [SortDefinitionElement], {
        defaultValue: [{ column: TowerColumn.id, sortOrder: SortOrder.ASCEND }],
    })
    sortDefinition: SortDefinitionElement[]
}

const levelFilter = (levels: TowerLevel[]): string => {
    return Array.from(new Set(levels))
        .map(level => `level = '${level}'`)
        .join(" OR ")
}

const kingdomFilter = (kingdoms: TowerKingdom[]): string => {
    return Array.from(new Set(kingdoms))
        .map(kingdom => `kingdom = '${kingdom}'`)
        .join(" OR ")
}

const typeFilter = (towerTypes: TowerType[]): string => {
    return Array.from(new Set(towerTypes))
        .map(towerType => `"towerType" = '${towerType}'`)
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
        const levels = levelFilter(onlyLevels)
        const kingdoms = kingdomFilter(onlyKingdoms)
        const towerTypes = typeFilter(onlyTowerTypes)
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
