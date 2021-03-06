import { Field, ArgsType, Int } from "type-graphql"
import {
    TowerType,
    TowerKingdom,
    TowerLevel,
    AttackTowerType,
    SortOrder,
    TowerSortColumn,
    AttackTowerSortColumn,
    BarracksTowerSortColumn,
} from "./enums"
import { Min, Max } from "class-validator"
import {
    SortDefinitionElement,
    AttackSortDefinitionElement,
    BarracksSortDefinitionElement,
    AbilitySortDefinitionElement,
    BuildSequenceSortDefinitionElement,
} from "./inputs"

export type AllowedSortDefinitionElement =
    | SortDefinitionElement
    | AttackSortDefinitionElement
    | BarracksSortDefinitionElement
    | AbilitySortDefinitionElement
    | BuildSequenceSortDefinitionElement

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

const ALL_TOWER_KINGDOMS = [
    TowerKingdom.KR,
    TowerKingdom.KRF,
    TowerKingdom.KRO,
    TowerKingdom.KRV,
]

const ALL_TOWER_LEVELS = [
    TowerLevel.LVL1,
    TowerLevel.LVL2,
    TowerLevel.LVL3,
    TowerLevel.LVL4,
]

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
        defaultValue: ALL_TOWER_KINGDOMS,
    })
    onlyKingdoms: [TowerKingdom]
}

@ArgsType()
export class TowerArgs extends BaseTowerArgs {
    @Field(_type => [TowerLevel], {
        defaultValue: ALL_TOWER_LEVELS,
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
        defaultValue: [{ column: TowerSortColumn.id, sortOrder: SortOrder.ASCEND }],
    })
    sortDefinition: [SortDefinitionElement]
}

@ArgsType()
export class AttackTowerArgs extends BaseTowerArgs {
    @Field(_type => [TowerLevel], {
        defaultValue: ALL_TOWER_LEVELS,
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
        defaultValue: [{ column: AttackTowerSortColumn.id, sortOrder: SortOrder.ASCEND }],
    })
    sortDefinition: [AttackSortDefinitionElement]
}

@ArgsType()
export class BarracksTowerArgs extends BaseTowerArgs {
    @Field(_type => [TowerLevel], {
        defaultValue: ALL_TOWER_LEVELS,
    })
    onlyLevels: [TowerLevel]

    @Field(_type => [BarracksSortDefinitionElement], {
        defaultValue: [
            { column: BarracksTowerSortColumn.id, sortOrder: SortOrder.ASCEND },
        ],
    })
    sortDefinition: [BarracksSortDefinitionElement]
}
