# Creates database, runs all migrations
# Seed the db tables with the data from the csv
# Print on the screen
# Drop the database
npm run db:create;
npm run db:migrate-all;
psql kingdom_rush_user -h localhost -d kingdom_rush_db -f ./scripts/db_load_csv.sql;
psql kingdom_rush_user --pset=pager -h localhost -d kingdom_rush_db -f ./scripts/db_table_info.sql;
npm run db:drop;