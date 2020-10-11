# Kingdom Rush GraphQL

Simply get Kingdom Rush Tower information through queries in GraphQL

## Tools

-   Express
-   GraphQL
-   TypeOrm
-   Postgresql
-   Apollo Server
-   Jest
-   Typescript

# Notes

```sql

psql postgres

CREATE ROLE kingdom_rush_user WITH LOGIN PASSWORD kr_password;
ALTER ROLE kingdom_rush_user CREATEDB;

\q
psql -d postgres -U kingdom_rush_user;
CREATE DATABASE kingdom_rush_db;

```
