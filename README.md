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

# run the database migrations
$ npm run migrate-all

# start the server
$ npm run start
```

## Tables

1. `Towers`

-   name
-   id
-   kingdom
-   tower type

2. `TowerBaseStats`

-   build_cost
-   minimum_damage
-   maximum_damage

3. `MeleeBaseStats`

-   health
-   respawn_rate
-   armor
-   number_of_units

4. `NonMeleeBaseStats`

-   fire_rate
-   range

5. `Abilities`

-   tower
-   name
-   description

6. `AbilityLevel`

-   ability
-   description
-   build cost
-   level
