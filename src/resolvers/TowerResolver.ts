import { getRepository } from "typeorm"
import { Resolver, Query, ArgsType, Args, Field, Int } from "type-graphql"
import { Tower } from "../models/Tower"

import { Min, Max } from "class-validator"

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
    @Query(() => [Tower])
    async towers(@Args() { skip, take }: TowerArgs) {
        const result: [Tower] = await getRepository(Tower).query(
            `SELECT * FROM "Towers" ORDER BY id ASC LIMIT ${take} OFFSET ${skip}`
        )

        const cleanResult = result.map(tower => ({
            ...tower,
            level: Number(tower["level"]),
        }))
        return cleanResult
    }
}
