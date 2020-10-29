This is a better formatted version of the automatically generated schema by type graphql.
This may or may not be updated. The source of truth is the link below:

-   https://github.com/mithi/kingdom-rush-graphql/blob/main/schema.gql

# QUERIES

```graphql
type Query {
    abilities(
        onlyKingdoms: [TowerKingdom!] = [KR, KRF, KRO, KRV]
        onlyTowerTypes: [TowerType!] = [BARRACKS, ARCHER, ARTILLERY, MAGE]
        skip: Int = 0
        sortDefinition: [AbilitySortDefinitionElement!] = [
            { column: towerName, sortOrder: ASCEND }
            { column: abilityName, sortOrder: ASCEND }
        ]
        take: Int = 104
    ): [Ability!]!

    attackTowers(
        onlyKingdoms: [TowerKingdom!] = [KR, KRF, KRO, KRV]
        onlyLevels: [TowerLevel!] = [LVL1, LVL2, LVL3, LVL4]
        onlyTowerTypes: [AttackTowerType!] = [ARCHER, ARTILLERY, MAGE]
        skip: Int = 0
        sortDefinition: [AttackSortDefinitionElement!] = [
            { column: id, sortOrder: ASCEND }
        ]
        take: Int = 104
    ): [AttackTower!]!

    barracksTowers(
        onlyKingdoms: [TowerKingdom!] = [KR, KRF, KRO, KRV]
        onlyLevels: [TowerLevel!] = [LVL1, LVL2, LVL3, LVL4]
        skip: Int = 0
        sortDefinition: [BarracksSortDefinitionElement!] = [
            { column: id, sortOrder: ASCEND }
        ]
        take: Int = 104
    ): [BarracksTower!]!

    buildSequences(
        onlyKingdoms: [TowerKingdom!] = [KR, KRF, KRO, KRV]
        onlyTowerTypes: [TowerType!] = [BARRACKS, ARCHER, ARTILLERY, MAGE]
        skip: Int = 0
        sortDefinition: [BuildSequenceSortDefinitionElement!] = [
            { column: kingdom, sortOrder: ASCEND }
            { column: towerType, sortOrder: ASCEND }
            { column: towerName, sortOrder: ASCEND }
        ]
        take: Int = 104
    ): [BuildSequence!]!

    towers(
        onlyKingdoms: [TowerKingdom!] = [KR, KRF, KRO, KRV]
        onlyLevels: [TowerLevel!] = [LVL1, LVL2, LVL3, LVL4]
        onlyTowerTypes: [TowerType!] = [BARRACKS, ARCHER, ARTILLERY, MAGE]
        skip: Int = 0
        sortDefinition: [SortDefinitionElement!] = [{ column: id, sortOrder: ASCEND }]
        take: Int = 104
    ): [TowerWithStats!]!

    abilitiesByTowerId(id: Float!): [Ability!]!
    abilitiesByTowerName(name: String!): [Ability!]!
    abilityById(id: Float!): Ability
    abilityByName(name: String!): Ability
    buildSequenceById(id: Float!): BuildSequence
    buildSequenceByTowerId(id: Float!): BuildSequence
    buildSequenceByTowerName(name: String!): BuildSequence
    towerById(id: Float!): TowerVerbose
}
```

# INPUTS

```graphql
input SortDefinitionElement {
    column: TowerSortColumn!
    sortOrder: SortOrder = ASCEND
}

input AbilitySortDefinitionElement {
    column: AbilitySortColumn!
    sortOrder: SortOrder = ASCEND
}

input BuildSequenceSortDefinitionElement {
    column: BuildSequenceSortColumn!
    sortOrder: SortOrder = ASCEND
}

input AttackSortDefinitionElement {
    column: AttackTowerSortColumn!
    sortOrder: SortOrder = ASCEND
}

input BarracksSortDefinitionElement {
    column: BarracksTowerSortColumn!
    sortOrder: SortOrder = ASCEND
}
```

# TYPES

```graphql
type Ability {
    abilityDescription: String!
    abilityId: Int!
    abilityName: String!
    kingdom: TowerKingdom!
    levelCosts: [Int!]!
    numberOfLevels: Int!
    totalAbilityCost: Int!
    totalCostWithTowers: Int!
    towerId: Int!
    towerImageUrl: String!
    towerName: String!
    towerType: TowerType!
}

type AttackTower {
    buildCost: Int!
    damageMaximum: Int!
    damageMinimum: Int!
    fireInterval: Float!
    id: Int!
    imageUrl: String!
    kingdom: TowerKingdom!
    level: TowerLevel!
    name: String!
    range: Int!
    towerType: TowerType!
}

type BarracksTower {
    armor: Int!
    buildCost: Int!
    damageMaximum: Int!
    damageMinimum: Int!
    health: Int!
    id: Int!
    imageUrl: String!
    kingdom: TowerKingdom!
    level: TowerLevel!
    name: String!
    numberOfUnits: Int!
    respawnInterval: Float!
    towerType: TowerType!
}

type BuildSequence {
    buildSequenceId: Int!
    kingdom: TowerKingdom!
    level1: BuildSequenceTower!
    level2: BuildSequenceTower!
    level3: BuildSequenceTower!
    level4: BuildSequenceTower!
    totalAbilitiesCost: Int!
    totalBuildCost: Int!
    totalBuildCostFullyUpgraded: Int!
    towerType: TowerType!
}

type BuildSequenceTower {
    buildCost: Int!
    id: Int!
    imageUrl: String!
    name: String!
}

type TowerVerbose {
    abilities: [Ability!]
    allStats: TowerWithNullableFields!
    buildSequence: BuildSequence
}

type TowerWithNullableFields {
    armor: Int
    buildCost: Int!
    damageMaximum: Int!
    damageMinimum: Int!
    fireInterval: Float
    health: Int
    id: Int!
    imageUrl: String!
    kingdom: TowerKingdom!
    level: TowerLevel!
    name: String!
    numberOfUnits: Int
    range: Int
    respawnInterval: Float
    towerType: TowerType!
}

type TowerWithStats {
    buildCost: Int!
    damageMaximum: Int!
    damageMinimum: Int!
    id: Int!
    imageUrl: String!
    kingdom: TowerKingdom!
    level: TowerLevel!
    name: String!
    towerType: TowerType!
}
```

# ENUMS

```graphql
enum AbilitySortColumn {
    abilityName
    kingdom
    totalCost
    totalCostWithTowers
    towerName
    towerType
}

enum BuildSequenceSortColumn {
    kingdom
    totalAbilitiesCost
    totalBuildCost
    totalBuildCostFullyUpgraded
    towerName
    towerType
}

enum TowerSortColumn {
    buildCost
    damageMaximum
    damageMinimum
    id
    kingdom
    level
    name
    towerType
}

enum AttackTowerSortColumn {
    buildCost
    damageMaximum
    damageMinimum
    fireInterval
    id
    kingdom
    level
    name
    range
    towerType
}

enum BarracksTowerSortColumn {
    armor
    buildCost
    damageMaximum
    damageMinimum
    health
    id
    kingdom
    level
    name
    numberOfUnits
    respawnInterval
}

enum SortOrder {
    ASCEND
    DESCEND
}

enum TowerKingdom {
    KR
    KRF
    KRO
    KRV
}

enum TowerLevel {
    LVL1
    LVL2
    LVL3
    LVL4
}

enum TowerType {
    ARCHER
    ARTILLERY
    BARRACKS
    MAGE
}

enum AttackTowerType {
    ARCHER
    ARTILLERY
    MAGE
}
```
