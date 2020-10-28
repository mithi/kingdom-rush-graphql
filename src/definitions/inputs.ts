import { Field, InputType } from "type-graphql"
import { SortOrder, TowerColumn, AttackTowerColumn, BarracksTowerColumn } from "./enums"

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
