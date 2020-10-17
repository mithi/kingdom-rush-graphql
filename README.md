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

## Notes

Inspect database

```sql
psql -d kingdom_rush_db -U kingdom_rush_user
\dt
SELECT * FROM "Towers"
```

Run migrations and start the server

```bash

# Generate a migration file
./node_modules/.bin/ts-node ./node_modules/typeorm/cli.js migration:generate -n 'MainStatsCreateTable'
```

`No migrations are pending` means that somewhere in the migration table it says that you have already run the migration for your migration file. Delete everything in the migrationtable. Run the migration again

## Data Shape

```graphql

Tower {
    name
    kingdom
    towerType
    level
    imageUrl

    MainStats (required) {
        buildCost
        damageMinimum
        damageMaximum
    }

    OtherStats (either BarracksStats or AttackStats) {
        BarrackStats{
            numberOfUnits
            respawnInternal
            health
            armor
        }
        AttackStats {
            fireInterval
            range
        }
    }

    Abilities (nullable) {
        name
        description
        imageUrl
        towerId
        abilityLevels: {
            1: {
                description
                buildCost
            }
            2: {
                description
                buildCost
            }
        }
    }
}

```
