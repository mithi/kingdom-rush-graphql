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

Inspect database and if you want to start from nothing, remove everything

```sql
psql -d kingdom_rush_db -U kingdom_rush_user

\dt
SELECT * FROM "Towers";
SELECT * FROM main_stats;
SELECT * FROM attack_stats;
SELECT * FROM barracks_stats;
SELECT * FROM migrations;

DROP TABLE "Towers";
DROP TABLE main_stats;
DROP TABLE attack_stats;
DROP TABLE barracks_stats;
DELETE FROM migrations;
```

Run migrations and start the server

```bash

# migrate
ts-node ./node_modules/typeorm/cli.js migration:run
# Generate a migration file
./node_modules/.bin/ts-node ./node_modules/typeorm/cli.js migration:generate -n MIGRATION_NAME
```

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
