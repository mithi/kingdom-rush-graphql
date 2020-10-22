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
    take: number
}

@Resolver()
export class TowerResolver {
    @Query(() => [TowerWithStats])
    async towers(@Args() { skip, take }: TowerArgs) {
        const result: [TowerWithStats] = await getRepository(Tower).query(
            `SELECT * FROM "Towers" INNER JOIN main_stats ON "Towers".id = main_stats."towerId" ORDER BY "Towers".id ASC LIMIT ${take} OFFSET ${skip}`
        )

        const cleanResult = result.map(tower => ({
            ...tower,
            level: Number(tower["level"]),
            buildCost: Number(tower["buildCost"]),
        }))
        return cleanResult
    }
}
