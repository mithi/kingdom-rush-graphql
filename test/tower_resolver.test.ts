import { createConnection, getConnection } from "typeorm"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "../src/resolvers/TowerResolver"
import { ApolloServer, gql } from "apollo-server"
import { createTestClient } from "apollo-server-testing"
import seed from "../src/seed"
import ascendingTowerIds from "./__snapshots__/ASCENDING_TOWER_IDS"
import attackTowersTypes from "./__snapshots__/ATTACK_TOWER_TYPES"
import attackTowersFireIntervalDescending from "./__snapshots__/ATTACK_TOWER_FIRE_INTERVAL_DESCEND"
import barracksTowers from "./__snapshots__/BARRACKS_TOWERS"

// FIX ME. What type am I? Where will I export this?
let SCHEMA: any
let QUERY: any

beforeAll(async () => {
    await createConnection("test")
    await seed({ dbName: "test", verbose: false })
    SCHEMA = await buildSchema({ resolvers: [TowerResolver] })
    QUERY = createTestClient(new ApolloServer({ schema: SCHEMA })).query
})

afterAll(async () => {
    await getConnection("test").close()
})

test("Be able to get towers, ids would be sorted in ascending order by default", async () => {
    const testQuery = gql`
        {
            towers {
                id
            }
        }
    `
    const result = await QUERY({ query: testQuery })
    expect(result).toMatchInlineSnapshot(ascendingTowerIds())
})

test("Be able to get attack towers, by default result will be sorted by id in ascending order", async () => {
    const testQuery = gql`
        {
            attackTowers {
                towerType
            }
        }
    `
    const result = await QUERY({ query: testQuery })
    expect(result).toMatchInlineSnapshot(attackTowersTypes())
})

test("Be able to get attack towers sorted by fire interval in descending order", async () => {
    const testQuery = gql`
        {
            attackTowers(sortDefinition: [{ column: fireInterval, sortOrder: DESCEND }]) {
                fireInterval
                towerType
            }
        }
    `
    const result = await QUERY({ query: testQuery })
    expect(result).toMatchInlineSnapshot(attackTowersFireIntervalDescending())
})

test("Be able to get barracks towers in correct order", async () => {
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
    const result = await QUERY({ query: testQuery })
    expect(result).toMatchInlineSnapshot(barracksTowers())
})
