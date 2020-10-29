import { Field, ArgsType } from "type-graphql"
import { BaseTowerArgs } from "./args"
import { TowerType, BuildSequenceColumn, SortOrder } from "./enums"
import { BuildSequenceSortDefinitionElement } from "./inputs"

@ArgsType()
export class BuildSequenceArgs extends BaseTowerArgs {
    @Field(_type => [TowerType], {
        defaultValue: [
            TowerType.BARRACKS,
            TowerType.ARCHER,
            TowerType.ARTILLERY,
            TowerType.MAGE,
        ],
    })
    onlyTowerTypes: [TowerType]

    @Field(_type => [BuildSequenceSortDefinitionElement], {
        defaultValue: [
            { column: BuildSequenceColumn.kingdom, sortOrder: SortOrder.ASCEND },
            { column: BuildSequenceColumn.towerType, sortOrder: SortOrder.ASCEND },
            { column: BuildSequenceColumn.towerName, sortOrder: SortOrder.ASCEND },
        ],
    })
    sortDefinition: [BuildSequenceSortDefinitionElement]
}
