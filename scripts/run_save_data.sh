python ./scripts/json-towers.py;
python ./scripts/json-barracks-stats.py;
python ./scripts/json-attack-stats.py;
python ./scripts/json-abilities.py;
python ./scripts/json-image-urls.py

npm run seed-json;

psql kingdom_rush_user -h  localhost -d kingdom_rush_db -f ./scripts/db_save_csv.sql;
