npm run db:create;
npm install;
npm run migrate-all;
npm run test;
psql kingdom_rush_user -h localhost -d kingdom_rush_db --pset=pager -f ./data/scripts/db_gen_info.sql;

