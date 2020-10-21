# Notes

## sql

```sql

psql kingdom_rush_user -h  localhost -d kingdom_rush_db -f save_copy.sql
psql -d kingdom_rush_db -U kingdom_rush_user
```

## Migrations

```bash

# migrate
ts-node ./node_modules/typeorm/cli.js migration:run

# Generate a migration file
./node_modules/.bin/ts-node ./node_modules/typeorm/cli.js migration:generate -n MIGRATION_NAME

# Revert migrations
typeorm migration:revert

# Starting afresh
DROP TABLE ability CASCADE;
DROP TABLE "Towers" CASCADE;
DROP TABLE ability_level;
DROP TABLE main_stats;
DROP TABLE attack_stats;
DROP TABLE barracks_stats;
DELETE FROM migrations;
```

## Abilities shape

```yaml
---
name: ""
number_of_abilities: 0
abilities:
    - name: ""
      description: ""
      number_of_levels: 0
      levels:
          - description: ""
            cost: 0
          - description: ""
            cost: 0
          - description: ""
            cost: 0
    - name: ""
      description: ""
      number_of_levels: 0
      levels:
          - description: ""
            cost: 0
          - description: ""
            cost: 0
          - description: ""
            cost: 0
    - name: ""
      description: ""
      number_of_levels: 0
      levels:
          - description: ""
            cost: 0
          - description: ""
            cost: 0
          - description: ""
            cost: 0
```

## Altering enums safely

```sql

ALTER TYPE status_enum RENAME TO status_enum_old;
CREATE TYPE status_enum AS ENUM('queued', 'running', 'done');
ALTER TABLE job ALTER COLUMN job_status TYPE status_enum USING job_status::text::status_enum;
DROP TYPE status_enum_old;

```
