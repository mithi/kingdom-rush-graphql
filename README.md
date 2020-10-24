# Kingdom Rush GraphQL

Simply get Kingdom Rush Tower information through queries in GraphQL

## Tools

1. TypeOrm
2. Apollo Server
3. TypeGraphQL
4. Express
5. Postgresql
6. Jest
7. Typescript
8. GraphQL

## Data Shape

```graphql

Tower {
    name
    kingdom
    towerType
    levels
    imageUrl
}

MainStats {
    towerId
    buildCost
    damageMinimum
    damageMaximum
}

BarrackStats {
    towerId
    numberOfUnits
    respawnInterval
    health
    armor
}

AttackStats {
    towerId
    fireInterval
    range
}

Abilities {
    towerId
    name
    description
    levels: [
        { abilityId, level: 0, cost },
        { abilityId, level: 1, cost },
        { abilityId, level: 2, cost }
    ]
}

```

## Good First Issue

The descriptions of the tower abilities are a mess, and it needs your help!
You can checkout [Kingdom Rush TD fandom](https://kingdomrushtd.fandom.com/wiki/Category:Towers)
for ideas for how to make it better.

The current descriptions can be found in the following files:

-   [./data/raw/KR/abilities.yml](./data/raw/KR/abilities.yml)
-   [./data/raw/KRF/abilities.yml](./data/raw/KRF/abilities.yml)
-   [./data/raw/KRO/abilities.yml](./data/raw/KRO/abilities.yml)
-   [./data/raw/KRV/abilities/abilities.yml](./data/raw/KRV/abilities/abilities.yml)

### 1. Seup postgreSQL

Make sure you have [postgresql](https://postgresapp.com/) installed and running on port 5432.

### 2. Fork, clone, setup env variables

Fork this repository, clone. Rename `.env.sample` to `.env`

```bash
git clone https://github.com/mithi/kingdom-rush-graphql.git
cd kingdom-rush-graphql
mv .env.sample .env
```

### 3. Install npm packages, setup database

Running this command, will create the necessary user roles and database.
It will then install the npm packages, run the tests, and
run the migrations to ensure that your default database has the correct schema.
Submit and issue if something goes wrong.

```bash
npm run setup
```

### 4. Update the description

Edit any of the following (tower ability) descriptions in any of the following yaml files

-   [./data/raw/KR/abilities.yml](./data/raw/KR/abilities.yml)
-   [./data/raw/KRF/abilities.yml](./data/raw/KRF/abilities.yml)
-   [./data/raw/KRO/abilities.yml](./data/raw/KRO/abilities.yml)
-   [./data/raw/KRV/abilities/abilities.yml](./data/raw/KRV/abilities/abilities.yml)

### 5. Regenerate Data and Cleanup

Run `npm run db:update-data` to update the generated/json,
populate your database and update the files in `/generated/csv/` and `/generated/txt/`.
`test`, `start`, and `build` should produce no errors.
Run `npm run db:drop` to drop all the created tables, databases and user.

```bash
npm run db:update-data
npm run test
npm run db:drop
```

### 6. Commit and PR

Congratulations! Looking forward to merging your pull request!

```bash
git checkout -b feat/update-tower-ability-description
git push -u origin HEAD
git add .
git commit -m "Update tower ability description"
git push
```
