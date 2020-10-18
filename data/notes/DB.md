# Database and Migrations

## Migrate from zero

If you want to start from scratch, you can delete everything and run all the migrations again

```sql
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

```sql
psql -d kingdom_rush_db -U kingdom_rush_user
```

### `Towers`

```sql
kingdom_rush_db=> \d+ "Towers"
                                                           Table "public.Towers"
  Column   |          Type           | Collation | Nullable |               Default                | Storage  | Stats target | Description
-----------+-------------------------+-----------+----------+--------------------------------------+----------+--------------+-------------
 id        | integer                 |           | not null | nextval('"Towers_id_seq"'::regclass) | plain    |              |
 name      | character varying       |           | not null |                                      | extended |              |
 towerType | "Towers_towertype_enum" |           | not null |                                      | plain    |              |
 level     | "Towers_level_enum"     |           | not null |                                      | plain    |              |
 kingdom   | "Towers_kingdom_enum"   |           | not null |                                      | plain    |              |
Indexes:
    "PK_d35a4e5481305c4848b560a3354" PRIMARY KEY, btree (id)
    "unique_tower" UNIQUE CONSTRAINT, btree (name, kingdom)
Referenced by:
    TABLE "main_stats" CONSTRAINT "FK_38a6e0a47022a1c957b90186462" FOREIGN KEY ("towerId") REFERENCES "Towers"(id) ON DELETE CASCADE
    TABLE "attack_stats" CONSTRAINT "FK_a183facc6b66a4851553798f608" FOREIGN KEY ("towerId") REFERENCES "Towers"(id) ON DELETE CASCADE
    TABLE "barracks_stats" CONSTRAINT "FK_d5dcdad1a2b257a2445db6106fb" FOREIGN KEY ("towerId") REFERENCES "Towers"(id) ON DELETE CASCADE
Access method: heap
```

### `main_stats`

```sql
kingdom_rush_db=> \d+ main_stats
                                                   Table "public.main_stats"
    Column     |  Type   | Collation | Nullable |                Default                 | Storage | Stats target | Description
---------------+---------+-----------+----------+----------------------------------------+---------+--------------+-------------
 id            | integer |           | not null | nextval('main_stats_id_seq'::regclass) | plain   |              |
 damageMinimum | real    |           | not null |                                        | plain   |              |
 damageMaximum | real    |           | not null |                                        | plain   |              |
 buildCost     | real    |           | not null |                                        | plain   |              |
 towerId       | integer |           |          |                                        | plain   |              |
Indexes:
    "PK_a9fe6ef57784aff6b73159e9b4d" PRIMARY KEY, btree (id)
    "REL_38a6e0a47022a1c957b9018646" UNIQUE CONSTRAINT, btree ("towerId")
Foreign-key constraints:
    "FK_38a6e0a47022a1c957b90186462" FOREIGN KEY ("towerId") REFERENCES "Towers"(id) ON DELETE CASCADE
Access method: heap
```

### `barracks_stats`

```sql
kingdom_rush_db=> \d+ barracks_stats
                                                    Table "public.barracks_stats"
     Column      |  Type   | Collation | Nullable |                  Default                   | Storage | Stats target | Description
-----------------+---------+-----------+----------+--------------------------------------------+---------+--------------+-------------
 id              | integer |           | not null | nextval('barracks_stats_id_seq'::regclass) | plain   |              |
 numberOfUnits   | integer |           | not null |                                            | plain   |              |
 respawnInterval | real    |           | not null |                                            | plain   |              |
 health          | real    |           | not null |                                            | plain   |              |
 armor           | real    |           | not null |                                            | plain   |              |
 towerId         | integer |           |          |                                            | plain   |              |
Indexes:
    "PK_06005d4dc8ba963484acae34726" PRIMARY KEY, btree (id)
    "REL_d5dcdad1a2b257a2445db6106f" UNIQUE CONSTRAINT, btree ("towerId")
Foreign-key constraints:
    "FK_d5dcdad1a2b257a2445db6106fb" FOREIGN KEY ("towerId") REFERENCES "Towers"(id) ON DELETE CASCADE
Access method: heap

```

### `attack_stats`

```sql

kingdom_rush_db=> \d+ attack_stats
                                                   Table "public.attack_stats"
    Column    |  Type   | Collation | Nullable |                 Default                  | Storage | Stats target | Description
--------------+---------+-----------+----------+------------------------------------------+---------+--------------+-------------
 id           | integer |           | not null | nextval('attack_stats_id_seq'::regclass) | plain   |              |
 fireInterval | real    |           | not null |                                          | plain   |              |
 range        | real    |           | not null |                                          | plain   |              |
 towerId      | integer |           |          |                                          | plain   |              |
Indexes:
    "PK_e7cb32239cb7dfd5eebae4d0eaf" PRIMARY KEY, btree (id)
    "REL_a183facc6b66a4851553798f60" UNIQUE CONSTRAINT, btree ("towerId")
Foreign-key constraints:
    "FK_a183facc6b66a4851553798f608" FOREIGN KEY ("towerId") REFERENCES "Towers"(id) ON DELETE CASCADE
Access method: heap
```
