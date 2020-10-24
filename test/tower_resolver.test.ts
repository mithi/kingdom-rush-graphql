import { createConnection, getConnection } from "typeorm"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "../src/resolvers/TowerResolver"
import { ApolloServer, gql } from "apollo-server"
import { createTestClient } from "apollo-server-testing"
import seed from "../src/seed"
import ascendingTowerIds from "./__snapshots__/ASCENDING_TOWER_IDS"

beforeAll(async () => {
    await createConnection("test")
    await seed({ dbName: "test", verbose: false })
})

afterAll(async () => {
    await getConnection("test").close()
})

test("Be able to get towers, ids should be in ascending order by default", async () => {
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
