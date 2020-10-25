import { Field, InputType } from "type-graphql"
import { SortOrder, TowerSortOrderColumn } from "../enums/TowerEnums"

@InputType()
export class SortDefinitionElement {
    @Field(_type => TowerSortOrderColumn)
    column: TowerSortOrderColumn

    @Field(_type => SortOrder, { defaultValue: SortOrder.ASCEND })
    sortType: SortOrder
}
