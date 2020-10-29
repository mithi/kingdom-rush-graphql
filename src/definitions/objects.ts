import { Field, ObjectType, Int, ID } from "type-graphql"
import { TowerType, TowerKingdom, TowerLevel } from "./enums"

@ObjectType()
export class TowerWithStats {
    @Field(() => ID)
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

    @Field(() => Int)
    buildCost: Number

    @Field(() => Int)
    damageMinimum: Number

    @Field(() => Int)
    damageMaximum: Number
}

@ObjectType()
export class AttackTower extends TowerWithStats {
    @Field(() => Number)
    fireInterval: Number

    @Field(() => Int)
    range: Number
}

@ObjectType()
export class BarracksTower extends TowerWithStats {
    @Field(() => Int)
    numberOfUnits: Number

    @Field(() => Int)
    armor: Number

    @Field(() => Int)
    health: Number

    @Field(() => Number)
    respawnInterval: Number
}

@ObjectType()
export class Ability {
    @Field(() => ID)
    abilityId: Number

    @Field(() => String)
    abilityName: string

    @Field(() => String)
    abilityDescription: string

    @Field(() => Int)
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

    @Field(() => Int)
    totalAbilityCost: Number

    @Field(() => Int)
    totalCostWithTowers: Number

    @Field(() => [Int])
    levelCosts: [Number]
}

@ObjectType()
export class BuildSequenceTower {
    @Field(() => String)
    name: String

    @Field(() => ID)
    id: Number

    @Field(() => Int)
    buildCost: Number

    @Field(() => String)
    imageUrl: String
}

@ObjectType()
export class BuildSequence {
    @Field(() => ID)
    buildSequenceId: Number

    @Field(() => TowerKingdom)
    kingdom: TowerKingdom

    @Field(() => TowerType)
    towerType: TowerType

    @Field(() => Int)
    totalBuildCost: Number

    @Field(() => Int)
    totalAbilitiesCost: Number

    @Field(() => Int)
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

@ObjectType()
export class TowerWithNullableFields extends TowerWithStats {
    @Field(() => Number, { nullable: true, defaultValue: null })
    fireInterval?: Number

    @Field(() => Int, { nullable: true, defaultValue: null })
    range?: Number

    @Field(() => Int, { nullable: true, defaultValue: null })
    numberOfUnits?: Number

    @Field(() => Int, { nullable: true, defaultValue: null })
    armor?: Number

    @Field(() => Int, { nullable: true, defaultValue: null })
    health?: Number

    @Field(() => Number, { nullable: true, defaultValue: null })
    respawnInterval?: Number
}

@ObjectType()
export class TowerVerbose {
    @Field(() => TowerWithNullableFields)
    allStats: TowerWithNullableFields

    @Field(() => [Ability], { nullable: true })
    abilities?: Ability[]

    @Field(() => BuildSequence, { nullable: true })
    buildSequence?: BuildSequence | null
}
