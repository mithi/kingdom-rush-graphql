npm run db:create;
npm install;
cp .env.sample .env
npm run db:migrate-all;
npm run test;
psql kingdom_rush_user -h localhost -d kingdom_rush_db --pset=pager -f ./scripts/db_gen_info.sql;

