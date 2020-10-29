import { Field, ArgsType } from "type-graphql"
import { BaseTowerArgs } from "./args"
import { TowerType, BuildSequenceSortColumn, SortOrder } from "./enums"
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
            { column: BuildSequenceSortColumn.kingdom, sortOrder: SortOrder.ASCEND },
            { column: BuildSequenceSortColumn.towerType, sortOrder: SortOrder.ASCEND },
            { column: BuildSequenceSortColumn.towerName, sortOrder: SortOrder.ASCEND },
        ],
    })
    sortDefinition: [BuildSequenceSortDefinitionElement]
}
