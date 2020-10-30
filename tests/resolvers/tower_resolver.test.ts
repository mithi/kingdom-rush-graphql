import { createConnection, getConnection } from "typeorm"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "../../src/resolvers/TowerResolver"
import { ApolloServer, gql } from "apollo-server"
import { createTestClient } from "apollo-server-testing"
import seed from "../../src/seed"
import ascendingTowerIds from "./__snapshots__/ASCENDING_TOWER_IDS"
import attackTowersTypes from "./__snapshots__/ATTACK_TOWER_TYPES"
import attackTowersFireIntervalDescending from "./__snapshots__/ATTACK_TOWER_FIRE_INTERVAL_DESCEND"
import barracksTowers from "./__snapshots__/BARRACKS_TOWERS"

beforeAll(async () => {
    const t0 = Date.now()
    await createConnection("test")
    await seed({ dbName: "test", verbose: false })
    const t1 = Date.now()
    console.log(` 👩‍🔬 Connected and populated database in ${t1 - t0}ms`)
})

afterAll(async () => {
    await getConnection("test").close()
})

test("1. Be able to get towers, ids would be sorted in ascending order by default", async () => {
    const schema = await buildSchema({ resolvers: [TowerResolver] })
    const { query } = createTestClient(new ApolloServer({ schema }))

    const testQuery = gql`
        {
            towers {
                id
            }
        }
    `
    const result = await query({ query: testQuery })
    expect(result).toMatchInlineSnapshot(ascendingTowerIds())
})

test("2. Be able to get attack towers, by default result will be sorted by id in ascending order", async () => {
    const schema = await buildSchema({ resolvers: [TowerResolver] })
    const { query } = createTestClient(new ApolloServer({ schema }))

    const testQuery = gql`
        {
            attackTowers {
                towerType
            }
        }
    `
    const result = await query({ query: testQuery })
    expect(result).toMatchInlineSnapshot(attackTowersTypes())
})

test("3. Be able to get attack towers sorted by fire interval in descending order", async () => {
    const schema = await buildSchema({ resolvers: [TowerResolver] })
    const { query } = createTestClient(new ApolloServer({ schema }))

    const testQuery = gql`
        {
            attackTowers(
                sortDefinition: [
                    { column: fireInterval, sortOrder: DESCEND }
                    { column: towerType, sortOrder: ASCEND }
                ]
            ) {
                fireInterval
                towerType
            }
        }
    `
    const result = await query({ query: testQuery })
    expect(result).toMatchInlineSnapshot(attackTowersFireIntervalDescending())
})

test("4. Be able to get barracks towers in correct order", async () => {
    const schema = await buildSchema({ resolvers: [TowerResolver] })
    const { query } = createTestClient(new ApolloServer({ schema }))

    const testQuery = gql`
        {
            barracksTowers(
                sortDefinition: [
                    { column: numberOfUnits, sortOrder: ASCEND }
                    { column: kingdom, sortOrder: DESCEND }
                    { column: name, sortOrder: DESCEND }
                ]
            ) {
                name
                kingdom
                numberOfUnits
            }
        }
    `
    const result = await query({ query: testQuery })
    expect(result).toMatchInlineSnapshot(barracksTowers())
})
