import { Field, ObjectType } from "type-graphql"
import { TowerType, TowerKingdom, TowerLevel } from "../enums/TowerEnums"

@ObjectType()
export class TowerWithStats {
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

export const allTowerLevels = [
    TowerLevel.LVL1,
    TowerLevel.LVL2,
    TowerLevel.LVL3,
    TowerLevel.LVL4,
]

export const allTowerKingdoms = [
    TowerKingdom.KR,
    TowerKingdom.KRF,
    TowerKingdom.KRO,
    TowerKingdom.KRV,
]
