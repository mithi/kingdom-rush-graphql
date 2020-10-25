import { Field, ObjectType, ArgsType, InputType, Int } from "type-graphql"
import {
    TowerType,
    TowerKingdom,
    TowerLevel,
    AttackTowerType,
    SortOrder,
    TowerColumn,
    AttackTowerColumn,
} from "../enums/TowerEnums"
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

@ArgsType()
export class TowerArgs extends BaseTowerArgs {
    @Field(_type => [TowerType], {
        defaultValue: allTowerTypes,
    })
    onlyTowerTypes: TowerType[]

    @Field(_type => [SortDefinitionElement], {
        defaultValue: [{ column: TowerColumn.id, sortOrder: SortOrder.ASCEND }],
    })
    sortDefinition: SortDefinitionElement[]
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

@InputType()
export class SortDefinitionElement {
    @Field(_type => TowerColumn)
    column: TowerColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder
}

@InputType()
export class AttackSortDefinitionElement {
    @Field(_type => AttackTowerColumn)
    column: AttackTowerColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}
