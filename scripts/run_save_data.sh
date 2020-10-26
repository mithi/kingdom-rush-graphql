# Generates json files from raw/yaml files
# Populates the database tables using these table files
# Gets the all data from the tables and saves it both as txt and csv
python ./scripts/json-towers.py;
python ./scripts/json-barracks-stats.py;
python ./scripts/json-attack-stats.py;
python ./scripts/json-abilities.py;
python ./scripts/json-image-urls.py;
python ./scripts/json-build-sequence.py

npm run db:seed-kr-db-json;

psql kingdom_rush_user -h localhost -d kingdom_rush_db -f ./scripts/db_save_csv.sql;
