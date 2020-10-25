import { Field, ObjectType, ArgsType, Int } from "type-graphql"
import { TowerType, TowerKingdom, TowerLevel, AttackTowerType } from "../enums/TowerEnums"
import { Min, Max } from "class-validator"

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

export const allTowerTypes = [
    TowerType.BARRACKS,
    TowerType.ARCHER,
    TowerType.ARTILLERY,
    TowerType.MAGE,
]

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

@ObjectType()
export class AttackTower extends TowerWithStats {
    @Field(() => Number)
    fireInterval: Number

    @Field(() => Number)
    range: Number
}

@ArgsType()
export class BaseTowerArgs {
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
}

type filterableEnums = TowerLevel | TowerKingdom | TowerType | AttackTowerType

export const createFilter = (enums: filterableEnums[], listType: string): string => {
    return Array.from(new Set(enums))
        .map(e => `${listType} = '${e}'`)
        .join(" OR ")
}
