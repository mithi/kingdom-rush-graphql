import { Field, InputType } from "type-graphql"
import {
    SortOrder,
    TowerColumn,
    AttackTowerColumn,
    BarracksTowerColumn,
    AbilityColumn,
    BuildSequenceColumn,
} from "./enums"

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

@InputType()
export class BarracksSortDefinitionElement {
    @Field(_type => BarracksTowerColumn)
    column: BarracksTowerColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}

@InputType()
export class AbilitySortDefinitionElement {
    @Field(_type => AbilityColumn)
    column: AbilityColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}

@InputType()
export class BuildSequenceSortDefinitionElement {
    @Field(_type => BuildSequenceColumn)
    column: BuildSequenceColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortOrder: SortOrder = SortOrder.ASCEND
}
