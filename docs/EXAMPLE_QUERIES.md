# Abilities

```graphql
{
    abilities(
        skip: 3
        take: 5
        onlyKingdoms: [KRV]
        onlyTowerTypes: [BARRACKS, ARCHER]
        sortDefinition: [
            { column: towerName, sortOrder: DESCEND }
            { column: abilityName, sortOrder: DESCEND }
        ]
    ) {
        towerName
        abilityName
        levelCosts
        kingdom
    }
}
```

```graphql
{
    abilitiesByTowerId(id: 50) {
        towerName
        abilityName
        kingdom
        towerId
        abilityId
    }
}
```

```graphql
{
    abilitiesByTowerName(name: "tesla x104") {
        towerName
        abilityName
        totalAbilityCost
        totalCostWithTowers
        levelCosts
    }
}
```

```graphql
{
    abilityByName(name: "Throwing Axes") {
        towerName
        totalAbilityCost
        totalCostWithTowers
        abilityName
    }
}
```

```graphql
{
    abilityById(id: 3) {
        towerName
        abilityName
        levelCosts
        kingdom
    }
}
```

# Build Sequences

```graphql
{
    buildSequences(
        skip: 10
        sortDefinition: [
            { column: totalBuildCostFullyUpgraded, sortOrder: DESCEND }
            { column: towerName, sortOrder: ASCEND }
        ]
    ) {
        totalBuildCostFullyUpgraded
        level4 {
            name
        }
        totalBuildCost
    }
}
```

```graphql
{
    buildSequenceById(id: 13) {
        totalBuildCostFullyUpgraded
        level1 {
            name
            buildCost
        }
        level2 {
            name
            buildCost
        }
        level3 {
            name
            buildCost
        }

        level4 {
            name
            buildCost
        }
        totalBuildCost
    }
}
```

```graphql
{
    buildSequenceByTowerName(name: "rocket riders, 4") {
        totalBuildCostFullyUpgraded
        level1 {
            name
            buildCost
            imageUrl
        }
        level2 {
            name
            buildCost
        }
        level3 {
            name
            buildCost
        }

        level4 {
            name
            buildCost
        }
        totalBuildCost
    }
}
```

```graphql
{
    buildSequenceByTowerId(id: 49) {
        totalBuildCostFullyUpgraded
        level4 {
            name
            buildCost
            imageUrl
            id
        }
        totalBuildCost
    }
}
```

# Towers

```graphql
{
    barracksTowers(
        sortDefinition: [
            { column: kingdom, sortOrder: ASCEND }
            { column: name, sortOrder: ASCEND }
        ]
    ) {
        name
        kingdom
    }
}
```

```graphql
{
    attackTowers(
        take: 10
        sortDefinition: [
            { column: towerType, sortOrder: ASCEND }
            { column: name, sortOrder: DESCEND }
        ]
        onlyKingdoms: [KR, KRF]
    ) {
        towerType
        name
    }
}
```

```graphql
{
    towerById(id: 10) {
        allStats {
            name
            fireInterval
            numberOfUnits
        }
        abilities {
            abilityName
            abilityDescription
            levelCosts
        }
        buildSequence {
            totalBuildCost
            totalBuildCostFullyUpgraded
        }
    }
}
```
