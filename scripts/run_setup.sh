npm run db:create;
npm install;
cp .env.sample .env;

# migrate and populate kingdom_rush_db
npm run db:migrate;
psql kingdom_rush_user -h localhost -d kingdom_rush_db -f ./scripts/db_load_csv.sql;

# migrate and populate test_db
psql kingdom_rush_user -h localhost -d test_db -f ./scripts/db_load_csv.sql;
psql kingdom_rush_user -h localhost -d test_db --pset=pager -f ./scripts/db_gen_info.sql;
psql kingdom_rush_user -h localhost -d test_db --pset=pager -f ./scripts/db_table_info.sql;

# sleep for a while to help prevent errors in testing the database
sleep 5

# run tests
npm run test
