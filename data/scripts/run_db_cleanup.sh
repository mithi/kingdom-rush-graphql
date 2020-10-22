psql -c "SELECT rolname FROM pg_catalog.pg_roles";

psql kingdom_rush_user -h  localhost -d kingdom_rush_db -f ./data/scripts/db_drop.sql;
psql kingdom_rush_user -h  localhost -d kingdom_rush_db -f ./data/scripts/db_gen_info.sql;
psql -c "DROP DATABASE test_db";
psql -c "DROP DATABASE kingdom_rush_db";
psql -c "DROP ROLE kingdom_rush_user";

echo "Current existing roles:"
psql -c "SELECT rolname FROM pg_catalog.pg_roles";


