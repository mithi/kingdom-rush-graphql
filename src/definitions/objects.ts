import { Field, ObjectType } from "type-graphql"
import { TowerType, TowerKingdom, TowerLevel } from "./enums"

@ObjectType()
export class TowerWithStats {
    @Field(() => Number)
    id: Number

    @Field(() => TowerType)
    towerType: TowerType

    @Field(() => TowerLevel)
    level: TowerLevel

    @Field(() => String)
    name: string

    @Field(() => TowerKingdom)
    kingdom: TowerKingdom

    @Field(() => String)
    imageUrl: string

    @Field(() => Number)
    buildCost: Number

    @Field(() => Number)
    damageMinimum: Number

    @Field(() => Number)
    damageMaximum: Number
}

@ObjectType()
export class AttackTower extends TowerWithStats {
    @Field(() => Number)
    fireInterval: Number

    @Field(() => Number)
    range: Number
}

@ObjectType()
export class BarracksTower extends TowerWithStats {
    @Field(() => Number)
    numberOfUnits: Number

    @Field(() => Number)
    armor: Number

    @Field(() => Number)
    health: Number

    @Field(() => Number)
    respawnInterval: Number
}

@ObjectType()
export class Ability {
    @Field(() => Number)
    abilityId: Number

    @Field(() => String)
    abilityName: string

    @Field(() => String)
    abilityDescription: string

    @Field(() => Number)
    numberOfLevels: Number

    @Field(() => Number)
    towerId: Number

    @Field(() => String)
    towerName: string

    @Field(() => String)
    towerImageUrl: string

    @Field(() => TowerType)
    towerType: TowerType

    @Field(() => TowerKingdom)
    kingdom: TowerKingdom

    @Field(() => Number)
    totalAbilityCost: Number

    @Field(() => Number)
    totalCostWithTowers: Number

    @Field(() => [Number])
    levelCosts: [Number]
}

@ObjectType()
export class BuildSequenceTower {
    @Field(() => String)
    name: String

    @Field(() => Number)
    id: Number

    @Field(() => Number)
    buildCost: Number

    @Field(() => String)
    imageUrl: String
}

@ObjectType()
export class BuildSequence {
    @Field(() => Number)
    buildSequenceId: Number

    @Field(() => TowerKingdom)
    kingdom: TowerType

    @Field(() => TowerType)
    towerType: TowerType

    @Field(() => Number)
    totalBuildCost: Number

    @Field(() => Number)
    totalAbilitiesCost: Number

    @Field(() => Number)
    totalBuildCostFullyUpgraded: Number

    @Field(() => BuildSequenceTower)
    level1: BuildSequenceTower

    @Field(() => BuildSequenceTower)
    level2: BuildSequenceTower

    @Field(() => BuildSequenceTower)
    level3: BuildSequenceTower

    @Field(() => BuildSequenceTower)
    level4: BuildSequenceTower
}
