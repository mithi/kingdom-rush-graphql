# Creates databases, runs all migrations
npm run db:create;
npm run db:migrate;

# Seed the kingdom rush db tables with the data from the csv
psql kingdom_rush_user -h localhost -d kingdom_rush_db -f ./scripts/db_load_csv.sql;
psql kingdom_rush_user -h localhost -d test_db -f ./scripts/db_load_csv.sql;

# Print on the screen
psql kingdom_rush_user --pset=pager -h localhost -d kingdom_rush_db -f ./scripts/db_table_info.sql;
psql kingdom_rush_user --pset=pager -h localhost -d test_db -f ./scripts/db_table_info.sql;

# Drop the database
npm run db:drop;