import { getRepository } from "typeorm"
import {
    Resolver,
    Query,
    ArgsType,
    Args,
    Field,
    Int,
    ObjectType,
    InputType,
} from "type-graphql"
import { Tower } from "../models/Tower"
import { TowerType, TowerKingdom, TowerLevel } from "../enums/TowerEnums"
import { Min, Max } from "class-validator"

import { registerEnumType } from "type-graphql"

export enum SortOrder {
    ASCEND = "ASC",
    DESCEND = "DESC",
}

export enum TowerSortOrderColumn {
    name = "name",
    kingdom = "kingdom",
    towerType = "towerType",
    level = "level",
    id = "towerId",
    buildCost = "buildCost",
    damageMinimum = "damageMinimum",
    damageMaximum = "damageMaximum",
}
registerEnumType(SortOrder, { name: "SortOrder" })
registerEnumType(TowerSortOrderColumn, { name: "TowerSortOrderColumn" })

@InputType()
export class SortDefinitionElement {
    @Field(_type => TowerSortOrderColumn)
    column: TowerSortOrderColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortType: SortOrder
}
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
@ObjectType()
class TowerWithStats {
    @Field(() => Number)
    id: Number

    @Field(() => TowerType)
    towerType: TowerType

    @Field(() => TowerLevel)
    level: TowerLevel

    @Field(() => String)
    name: string

    @Field(() => TowerKingdom)
    kingdom: TowerKingdom

    @Field(() => String)
    imageUrl: string

    @Field(() => Number)
    buildCost: Number

    @Field(() => Number)
    damageMinimum: Number

    @Field(() => Number)
    damageMaximum: Number
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
        defaultValue: [
            TowerLevel.LVL1,
            TowerLevel.LVL2,
            TowerLevel.LVL3,
            TowerLevel.LVL4,
        ],
    })
    onlyLevels: TowerLevel[]

    @Field(_type => [TowerKingdom], {
        defaultValue: [
            TowerKingdom.KR,
            TowerKingdom.KRF,
            TowerKingdom.KRO,
            TowerKingdom.KRV,
        ],
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
        defaultValue: [{ column: TowerSortOrderColumn.id, sortType: SortOrder.DESCEND }],
    })
    sortDefinition: SortDefinitionElement[]
}

const levelFilter = (levels: TowerLevel[]): string => {
    const given = Array.from(new Set(levels)).map(level => `level = '${level}'`)
    const result = given.join(" OR ")
    return result
}

const kingdomFilter = (kingdoms: TowerKingdom[]): string => {
    const given = Array.from(new Set(kingdoms)).map(kingdom => `kingdom = '${kingdom}'`)
    const result = given.join(" OR ")
    return result
}

const typeFilter = (towerTypes: TowerType[]): string => {
    const given = Array.from(new Set(towerTypes)).map(
        towerType => `"towerType" = '${towerType}'`
    )
    const result = given.join(" OR ")
    return result
}

const sortExpression = (sortDefinition: SortDefinitionElement[]) => {
    const given = sortDefinition.map(sortRow => `"${sortRow.column}" ${sortRow.sortType}`)
    const result = given.join(", ")
    return result
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
        const sortColumns = sortExpression(sortDefinition)

        const filterExpr = `WHERE (${levels}) AND (${kingdoms}) AND (${towerTypes})`
        const sortExpr = `ORDER BY ${sortColumns}`
        const pageExpr = `LIMIT ${take} OFFSET ${skip}`
        const queryExpression = `${tableExpr} ${filterExpr} ${sortExpr} ${pageExpr}`

        console.log(queryExpression)

        const result: [TowerWithStats] = await getRepository(Tower).query(queryExpression)

        const cleanResult = result.map(tower => ({
            ...tower,
            level: Number(tower["level"]),
        }))
        return cleanResult
    }
}
