# Creates a role named kingdom_rush_user with databases named
# - empty_test_db
# - test_db
# - kingdom_rush_db

# Load all variables in dotenv file
export $(egrep -v '^#' .env | xargs);

echo "Hey, make sure you have postgres installed and running at port 5432";
echo "Also, make sure your .env file has a DB_PASSWORD";
echo "DB_PASSWORD=${DB_PASSWORD}";

echo "Current existing roles:"
psql -c "SELECT rolname FROM pg_catalog.pg_roles";

psql -c "CREATE ROLE kingdom_rush_user WITH LOGIN PASSWORD '${DB_PASSWORD}';";
psql -c "ALTER ROLE kingdom_rush_user CREATEDB;";
psql postgres -U kingdom_rush_user -c "CREATE DATABASE kingdom_rush_db;";
psql postgres -U kingdom_rush_user -c "CREATE DATABASE test_db;";
psql postgres -U kingdom_rush_user -c "CREATE DATABASE empty_test_db;";

echo "Current existing roles:"
psql -c "SELECT rolname FROM pg_catalog.pg_roles";
