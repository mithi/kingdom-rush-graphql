cd ./data/scripts;
python json-towers.py;
python json-barracks-stats.py;
python json-attack-stats.py;
python json-abilities.py;
python json-image-urls.py
cd ../..;

npm run seed-json;

cd ./data/scripts;
psql kingdom_rush_user -h  localhost -d kingdom_rush_db -f db_save_csv.sql;
cd ../..;