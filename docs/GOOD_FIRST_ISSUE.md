# Good First Pull Request

The descriptions of the tower abilities are a mess, and this repository needs your help!
You can checkout [Kingdom Rush TD fandom](https://kingdomrushtd.fandom.com/wiki/Category:Towers)
for ideas for how to make them better.

The current descriptions can be found in the following files:

-   [../data/raw/KR/abilities.yml](../data/raw/KR/abilities.yml)
-   [../data/raw/KRF/abilities.yml](../data/raw/KRF/abilities.yml)
-   [../data/raw/KRO/abilities.yml](../data/raw/KRO/abilities.yml)
-   [../data/raw/KRV/abilities/abilities.yml](../data/raw/KRV/abilities/abilities.yml)

## 1. Setup PostgreSQL

Make sure you have [postgresql](https://postgresapp.com/) installed and running on port 5432.

## 2. Fork and clone

Fork this repository and clone.

```bash
git clone https://github.com/YOUR_USER_NAME/kingdom-rush-graphql.git
cd kingdom-rush-graphql
```

## 3. Set things up

```bash
npm install
```

After installing the required packages, running the command above will also run `npm run postinstall`
which will do the following:

1. Setup a local `.env` file
2. Create the necessary user roles and database
3. Run the migrations to ensure that your default database has the correct schema.
4. Populate the database
5. Run the tests

Submit and issue if something goes wrong.

## 4. Update the description

Edit any of the following (tower ability) descriptions in any of the following yaml files

-   [../data/raw/KR/abilities.yml](../data/raw/KR/abilities.yml)
-   [../data/raw/KRF/abilities.yml](../data/raw/KRF/abilities.yml)
-   [../data/raw/KRO/abilities.yml](../data/raw/KRO/abilities.yml)
-   [../data/raw/KRV/abilities/abilities.yml](../data/raw/KRV/abilities/abilities.yml)

## 5. Regenerate data and cleanup

Run `npm run db:reset-data` to update the generated/json,
populate your database and update the files in `/generated/csv/` and `/generated/txt/`.
Run `npm run db:drop` to drop all the created tables, databases and user.

```bash
npm run db:reset-data
npm run test
npm run db:drop
```

You can also try running `npm run start:dev`, `npm run build` and ``npm run start`, they should produce no errors.
You can go try out querying some graphql queries like the ones in [example queries](./EXAMPLE_QUERIES.md).

## 6. Commit and submit a pull request

After committing and pushing upstream,

```bash
git checkout -b feat/update-tower-ability-description
git push -u origin HEAD
git add .
git commit -m "Update tower ability description"
git push
```

Go to your remote fork and create the pull request to this repository.
Congratulations! Looking forward to merging your pull request!
