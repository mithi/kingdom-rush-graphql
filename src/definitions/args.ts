import { Field, ArgsType, Int } from "type-graphql"
import {
    TowerType,
    TowerKingdom,
    TowerLevel,
    AttackTowerType,
    SortOrder,
    TowerColumn,
    AttackTowerColumn,
    BarracksTowerColumn,
} from "./enums"
import { Min, Max } from "class-validator"
import {
    SortDefinitionElement,
    AttackSortDefinitionElement,
    BarracksSortDefinitionElement,
    AbilitySortDefinitionElement,
} from "./inputs"

export type AllowedSortDefinitionElement =
    | SortDefinitionElement
    | AttackSortDefinitionElement
    | BarracksSortDefinitionElement
    | AbilitySortDefinitionElement

export type FilterableEnums = TowerLevel | TowerKingdom | TowerType | AttackTowerType
export type AllowedTowerTypes = TowerType | AttackTowerType

export interface BuildQueryArgs {
    skip: number
    take: number
    onlyLevels: TowerLevel[]
    onlyKingdoms: TowerKingdom[]
    onlyTowerTypes: AllowedTowerTypes[]
    sortDefinition: AllowedSortDefinitionElement[]
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

@ArgsType()
export class TowerArgs extends BaseTowerArgs {
    @Field(_type => [TowerLevel], {
        defaultValue: [
            TowerLevel.LVL1,
            TowerLevel.LVL2,
            TowerLevel.LVL3,
            TowerLevel.LVL4,
        ],
    })
    onlyLevels: [TowerLevel]

    @Field(_type => [TowerType], {
        defaultValue: [
            TowerType.BARRACKS,
            TowerType.ARCHER,
            TowerType.ARTILLERY,
            TowerType.MAGE,
        ],
    })
    onlyTowerTypes: [TowerType]

    @Field(_type => [SortDefinitionElement], {
        defaultValue: [{ column: TowerColumn.id, sortOrder: SortOrder.ASCEND }],
    })
    sortDefinition: SortDefinitionElement[]
}

@ArgsType()
export class AttackTowerArgs extends BaseTowerArgs {
    @Field(_type => [TowerLevel], {
        defaultValue: [
            TowerLevel.LVL1,
            TowerLevel.LVL2,
            TowerLevel.LVL3,
            TowerLevel.LVL4,
        ],
    })
    onlyLevels: [TowerLevel]

    @Field(_type => [AttackTowerType], {
        defaultValue: [
            AttackTowerType.ARCHER,
            AttackTowerType.ARTILLERY,
            AttackTowerType.MAGE,
        ],
    })
    onlyTowerTypes: [AttackTowerType]

    @Field(_type => [AttackSortDefinitionElement], {
        defaultValue: [{ column: AttackTowerColumn.id, sortType: SortOrder.ASCEND }],
    })
    sortDefinition: AttackSortDefinitionElement[]
}

@ArgsType()
export class BarracksTowerArgs extends BaseTowerArgs {
    @Field(_type => [TowerLevel], {
        defaultValue: [
            TowerLevel.LVL1,
            TowerLevel.LVL2,
            TowerLevel.LVL3,
            TowerLevel.LVL4,
        ],
    })
    onlyLevels: [TowerLevel]

    @Field(_type => [BarracksSortDefinitionElement], {
        defaultValue: [{ column: BarracksTowerColumn.id, sortType: SortOrder.ASCEND }],
    })
    sortDefinition: BarracksSortDefinitionElement[]
}
