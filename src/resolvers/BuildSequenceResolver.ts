/*
buildSequences(
  skip: 1
  take: 5
  onlyKingdoms: []
  onlyTowerTypes: []
  sortBy: [
    tower4Name,
    towerType
    kingdom
    totalBuildCost
    totalAbilitiesCost
    totalCostFullyUpgraded
  ]
) {
  level1: { name, id, buildCost, imageUrl }
  level2: { name, id, buildCost, imageUrl }
  level3: { name, id, buildCost, imageUrl }
  level4: { name, id, buildCost, imageUrl }
  buildSequenceId
  kingdom
  towerType
  totalBuildCost
  totalAbilitiesCost
  totalBuildCostFullyUpgraded
}

*/

import { Resolver, Query, Args, Arg } from "type-graphql"
import { BuildSequence } from "../definitions/objects"
import { BuildSequenceArgs } from "../definitions/argsBuildSequence"
import { BuildSequenceService } from "../services/BuildSequenceService"

@Resolver()
export class BuildSequenceResolver {
    private buildSequenceService = new BuildSequenceService()

    @Query(() => [BuildSequence])
    async buildSequences(@Args() args: BuildSequenceArgs) {
        return this.buildSequenceService.buildSequences(args)
    }

    @Query(() => BuildSequence, { nullable: true })
    async buildSequenceById(@Arg("id") id: Number) {
        return this.buildSequenceService.buildSequenceById(id)
    }

    @Query(() => BuildSequence, { nullable: true })
    async buildSequenceByTowerId(@Arg("id") id: Number) {
        return this.buildSequenceService.buildSequenceByTowerId(id)
    }
}
