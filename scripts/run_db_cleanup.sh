# Drops all tables, enums in kingdom_rush_db then drops this database and user
psql -c "SELECT rolname FROM pg_catalog.pg_roles";
psql kingdom_rush_user -h localhost -d kingdom_rush_db --pset=pager -f ./scripts/db_drop.sql;
psql kingdom_rush_user -h localhost -d test_db --pset=pager -f ./scripts/db_drop.sql;

psql -c "DROP DATABASE IF EXISTS empty_test_db";
psql -c "DROP DATABASE IF EXISTS test_db";
psql -c "DROP DATABASE IF EXISTS kingdom_rush_db";
psql -c "DROP ROLE IF EXISTS kingdom_rush_user";
echo "Current existing roles:"
psql -c "SELECT rolname FROM pg_catalog.pg_roles";


