# Generates json files from raw/yaml files
python ./scripts/json-towers.py;
python ./scripts/json-barracks-stats.py;
python ./scripts/json-attack-stats.py;
python ./scripts/json-abilities.py;
python ./scripts/json-image-urls.py;
python ./scripts/json-build-sequence.py

# Populates the "kingdom_rush_db" and database tables using these table files
npm run db:seed-json;

# Gets the all data from the tables and saves it both as txt and csv
psql kingdom_rush_user -h localhost -d kingdom_rush_db -f ./scripts/db_save_csv.sql;

# Populates "test_db" from csv files
psql kingdom_rush_user -h localhost -d test_db -f ./scripts/db_load_csv.sql;