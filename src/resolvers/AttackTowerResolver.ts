/*
Towers(
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
        {column: "fireRate", order: "ASCENDING"},
        {column: "range", order: "ASCENDING"},
    ]
)
 */
import { Resolver, Query, ArgsType, Field, InputType, Args } from "type-graphql"
import {
    AttackTowerType,
    TowerKingdom,
    TowerLevel,
    SortOrder,
    AttackTowerColumn,
} from "../enums/TowerEnums"
import { AttackTower, BaseTowerArgs } from "./shared"
import { getRepository } from "typeorm"
import { Tower } from "../models/Tower"

@InputType()
class AttackSortDefinitionElement {
    @Field(_type => AttackTowerColumn)
    column: AttackTowerColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}

@ArgsType()
export class AttackTowerArgs extends BaseTowerArgs {
    @Field(_type => [AttackTowerType], {
        defaultValue: [
            AttackTowerType.ARCHER,
            AttackTowerType.ARTILLERY,
            AttackTowerType.MAGE,
        ],
    })
    onlyTowerTypes: AttackTowerType[]

    @Field(_type => [AttackSortDefinitionElement], {
        defaultValue: [{ column: AttackTowerColumn.id, sortType: SortOrder.ASCEND }],
    })
    sortDefinition: AttackSortDefinitionElement[]
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

const typeFilter = (towerTypes: AttackTowerType[]): string => {
    return Array.from(new Set(towerTypes))
        .map(towerType => `"towerType" = '${towerType}'`)
        .join(" OR ")
}

const sortExpression = (sortDefinition: AttackSortDefinitionElement[]) => {
    return sortDefinition
        .map(sortRow => `${sortRow.column} ${sortRow.sortOrder}`)
        .join(", ")
}

@Resolver()
export class AttackTowerResolver {
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
