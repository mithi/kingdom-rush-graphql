# Kingdom Rush GraphQL

Simply get Kingdom Rush Tower information through queries in GraphQL

## Tools

1. TypeOrm
2. Apollo Server
3. TypeGraphQL
4. Express
5. Postgresql
6. Jest
7. Typescript
8. GraphQL

## Data Shape

```graphql

Tower {
    name
    kingdom
    towerType
    levels
    imageUrl
}

MainStats {
    towerId
    buildCost
    damageMinimum
    damageMaximum
}

BarrackStats{
    towerId
    numberOfUnits
    respawnInterval
    health
    armor
}

AttackStats {
    towerId
    fireInterval
    range
}

Abilities {
    towerId
    name
    description
    levels: [
        { abilityId, level: 0, cost }
        { abilityId, level: 1, cost }
        { abilityId, level: 2, cost }
    ]
}

```
