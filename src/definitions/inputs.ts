import { Field, InputType } from "type-graphql"
import {
    SortOrder,
    TowerSortColumn,
    AttackTowerSortColumn,
    BarracksTowerSortColumn,
    AbilitySortColumn,
    BuildSequenceSortColumn,
} from "./enums"

@InputType()
export class SortDefinitionElement {
    @Field(_type => TowerSortColumn)
    column: TowerSortColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder
}

@InputType()
export class AttackSortDefinitionElement {
    @Field(_type => AttackTowerSortColumn)
    column: AttackTowerSortColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}

@InputType()
export class BarracksSortDefinitionElement {
    @Field(_type => BarracksTowerSortColumn)
    column: BarracksTowerSortColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}

@InputType()
export class AbilitySortDefinitionElement {
    @Field(_type => AbilitySortColumn)
    column: AbilitySortColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}

@InputType()
export class BuildSequenceSortDefinitionElement {
    @Field(_type => BuildSequenceSortColumn)
    column: BuildSequenceSortColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}
