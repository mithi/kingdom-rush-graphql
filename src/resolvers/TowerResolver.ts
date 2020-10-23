import { getRepository } from "typeorm"
import { Resolver, Query, ArgsType, Args, Field, Int, ObjectType } from "type-graphql"
import { Tower } from "../models/Tower"
import { TowerType, TowerKingdom, TowerLevel } from "../enums/TowerEnums"
import { Min, Max } from "class-validator"

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
    onlyLevels: [TowerLevel]

    @Field(_type => [TowerKingdom], {
        defaultValue: [
            TowerKingdom.KR,
            TowerKingdom.KRF,
            TowerKingdom.KRO,
            TowerKingdom.KRV,
        ],
    })
    onlyKingdoms: [TowerKingdom]
}

const levelFilter = (levels: [TowerLevel]): string => {
    const given = levels.map(level => `level = '${level}'`)
    const result = given.join(" OR ")
    return result
}

const kingdomFilter = (kingdoms: [TowerKingdom]): string => {
    const given = kingdoms.map(kingdom => `kingdom = '${kingdom}'`)
    const result = given.join(" OR ")
    return result
}

@Resolver()
export class TowerResolver {
    @Query(() => [TowerWithStats])
    async towers(@Args() { skip, take, onlyLevels, onlyKingdoms }: TowerArgs) {
        if (onlyLevels.length <= 0) {
            return []
        }

        if (onlyKingdoms.length <= 0) {
            return []
        }

        const tableExpr = `SELECT * FROM "Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId"`
        const filterExpr = `WHERE (${levelFilter(onlyLevels)}) AND (${kingdomFilter(
            onlyKingdoms
        )})`
        const sortExpr = `ORDER BY "Towers".id ASC`
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
