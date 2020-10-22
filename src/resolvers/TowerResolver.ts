import { getRepository } from "typeorm"
import { Resolver, Query, ArgsType, Args, Field, Int, ObjectType } from "type-graphql"
import { Tower } from "../models/Tower"
import { TowerType, TowerKingdom, TowerLevel } from "../enums/TowerEnums"
import { Min, Max } from "class-validator"

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
}

const levelQuery = (levels: [TowerLevel]): string => {
    const given = levels.map(level => `level = '${level}'`)
    const result = given.join(" OR ")
    return result
}

@Resolver()
export class TowerResolver {
    @Query(() => [TowerWithStats])
    async towers(@Args() { skip, take, onlyLevels }: TowerArgs) {
        const tableExpr = `SELECT * FROM "Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId"`
        const filterExpr = `WHERE ${levelQuery(onlyLevels)}`
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
