/**
 Abilities(
  skip: 0,
  take: 87,
  onlyKingdom = [KR, KRV]
  onlyTowerType = [BARRACKS, MAGE]
  sortDefinition [
    { column: towerNames, sortOrder: ASC },
    { column: abilityName, sortOrder: ASC },
    { column: totalAbilityCost, sortOrder: ASC },
    { column: totalCostWithTowers, sortOrder: ASC },
    { column: kingdom, sortOrder: ASC },
    { column: towerType, sortOrder: ASC },
  ]
) {
    abilityId: Number
    abilityName: string
    abilityDescription: string
    numberOfLevels: Number
    towerId: Number
    towerName: string
    towerImageUrl: string
    towerType: TowerType
    kingdom: TowerKingdom
    totalAbilityCost: Number
    totalCostWithTowers: Number
    levelCosts: [Number]
}
*/

import { Resolver, Query, Args, Arg } from "type-graphql"
import { Ability } from "../definitions/objects"
import { AbilityArgs } from "../definitions/argsAbility"

import { AbilityService } from "../services/AbilityService"

@Resolver()
export class AbilityResolver {
    private abilityService = new AbilityService()

    @Query(() => [Ability])
    async abilities(@Args() abilityArgs: AbilityArgs) {
        return this.abilityService.abilities(abilityArgs)
    }

    @Query(() => [Ability])
    async abilitiesByTowerId(@Arg("id") id: Number) {
        return this.abilityService.abilitiesByTowerId(id)
    }

    @Query(() => [Ability])
    async abilitiesByTowerName(@Arg("name") name: String) {
        return this.abilityService.abilitiesByTowerName(name)
    }

    @Query(() => Ability, { nullable: true })
    async abilityById(@Arg("id") id: Number) {
        return this.abilityService.abilityById(id)
    }

    @Query(() => Ability, { nullable: true })
    async abilityByName(@Arg("name") name: String) {
        return this.abilityService.abilityByName(name)
    }
}
