import { createConnection, getConnection } from "typeorm"
import { buildSchema } from "type-graphql"
import { AbilityResolver } from "../../src/resolvers/AbilityResolver"
import { ApolloServer, gql } from "apollo-server"
import { createTestClient } from "apollo-server-testing"
import ABILITY_BY_ID_RESULT from "./__snapshots__/ABILITY_BY_ID"
import { DocumentNode } from "graphql"

beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

const executeTest = async (testQuery: DocumentNode, correctAnswer: string) => {
    const schema = await buildSchema({ resolvers: [AbilityResolver] })
    const { query } = createTestClient(new ApolloServer({ schema }))

    const result = await query({ query: testQuery })
    expect(result).toMatchInlineSnapshot(correctAnswer)
}

test("1. Be able to get ability data by its id", async () => {
    const testQuery = gql`
        {
            abilityById(id: 85) {
                abilityDescription
                abilityId
                abilityName
                kingdom
                levelCosts
                numberOfLevels
                totalAbilityCost
                totalCostWithTowers
                towerId
                towerImageUrl
                towerName
                towerType
            }
        }
    `
    await executeTest(testQuery, ABILITY_BY_ID_RESULT())
})
