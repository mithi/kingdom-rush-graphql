# Good First Pull Request

The descriptions of the tower abilities are a mess, and this repository needs your help!
You can checkout [Kingdom Rush TD fandom](https://kingdomrushtd.fandom.com/wiki/Category:Towers)
for ideas for how to make it better.

The current descriptions can be found in the following files:

-   [../data/raw/KR/abilities.yml](../data/raw/KR/abilities.yml)
-   [../data/raw/KRF/abilities.yml](../data/raw/KRF/abilities.yml)
-   [../data/raw/KRO/abilities.yml](../data/raw/KRO/abilities.yml)
-   [../data/raw/KRV/abilities/abilities.yml](../data/raw/KRV/abilities/abilities.yml)

## 1. Setup postgreSQL

Make sure you have [postgresql](https://postgresapp.com/) installed and running on port 5432.

## 2. Fork and clone

Fork this repository and clone.

```bash
git clone https://github.com/YOUR_USER_NAME/kingdom-rush-graphql.git
cd kingdom-rush-graphql
```

## 3. Set things up

```bash
npm run setup
```

Running the command above will do the following:

1. Create the necessary user roles and database
2. Setup a `.env` file
3. Install the npm packages
4. Run the tests, and
5. Run the migrations to ensure that your default database has the correct schema.

Submit and issue if something goes wrong.

## 4. Update the description

Edit any of the following (tower ability) descriptions in any of the following yaml files

-   [../data/raw/KR/abilities.yml](../data/raw/KR/abilities.yml)
-   [../data/raw/KRF/abilities.yml](../data/raw/KRF/abilities.yml)
-   [../data/raw/KRO/abilities.yml](../data/raw/KRO/abilities.yml)
-   [../data/raw/KRV/abilities/abilities.yml](../data/raw/KRV/abilities/abilities.yml)

## 5. Regenerate data and cleanup

Run `npm run db:update-data` to update the generated/json,
populate your database and update the files in `/generated/csv/` and `/generated/txt/`.
`test`, `start`, and `build` should produce no errors.
Run `npm run db:drop` to drop all the created tables, databases and user.

```bash
npm run db:update-data
npm run test
npm run db:drop
```

You can also try running `npm run start` and `npm run build`, they should produce no error.
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

Go to your remote fork and create the pull request to this reposity.
Congratulations! Looking forward to merging your pull request!
