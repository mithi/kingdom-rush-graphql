# Database and Migrations

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

## Migrate from zero

If you want to start from scratch, you can delete everything and run all the migrations again

```sql
\copy (Select * From "Towers") To '../generated/tower.csv' With CSV
\copy (Select * From main_stats) To '../generated/main-stats.csv' With CSV
\copy (Select * From attack_stats) To '../generated/attacks-stats.csv' With CSV
\copy (Select * From barracks_stats) To '../generated/barracks-stats.csv' With CSV
\copy (Select * From ability) To '../generated/ability.csv' With CSV
\copy (Select * From ability_levels) To '../generated/ability-levels.csv' With CSV

\o out.txt
SELECT * FROM "Towers";
SELECT * FROM main_stats;
SELECT * FROM attack_stats;
SELECT * FROM barracks_stats;
SELECT * FROM ability;
SELECT * FROM ability_level;
SELECT * FROM migrations;

DROP TABLE ability CASCADE;
DROP TABLE "Towers" CASCADE;
DROP TABLE ability_level;
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

```sql
psql -d kingdom_rush_db -U kingdom_rush_user
```

```
python towers-json.py;
python main-stats-json.py;
python barracks-stats-json.py;
python attack-stats-json.py;
python abilities-json.py;

bash generate.sh
```
