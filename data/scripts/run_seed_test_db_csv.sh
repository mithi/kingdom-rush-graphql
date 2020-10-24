psql kingdom_rush_user -h localhost -d test_db -f ./data/scripts/db_load_csv.sql;
psql kingdom_rush_user --pset=pager -h localhost -d test_db -f ./data/scripts/db_table_info.sql;
