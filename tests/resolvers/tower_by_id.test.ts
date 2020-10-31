import { createConnection, getConnection } from "typeorm"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "../../src/resolvers/TowerResolver"
import { ApolloServer, gql } from "apollo-server"
import { createTestClient } from "apollo-server-testing"
import { DocumentNode } from "graphql"
import ARTILLERY_LVL4 from "./__snapshots__/ARTILLERY_LVL_4"
beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

const executeTest = async (testQuery: DocumentNode, correctAnswer: string) => {
    const schema = await buildSchema({ resolvers: [TowerResolver] })
    const { query } = createTestClient(new ApolloServer({ schema }))

    const result = await query({ query: testQuery })
    expect(result).toMatchInlineSnapshot(correctAnswer)
}

test("1. Be able to query by tower ID", async () => {
    const testQuery = gql`
        {
            towerById(id: 5) {
                abilities {
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

                allStats {
                    armor
                    buildCost
                    damageMaximum
                    damageMinimum
                    fireInterval
                    health
                    id
                    imageUrl
                    kingdom
                    level
                    name
                    numberOfUnits
                    range
                    respawnInterval
                    towerType
                }
                buildSequence {
                    buildSequenceId
                    kingdom
                    level1 {
                        buildCost
                        id
                        imageUrl
                        name
                    }
                    level2 {
                        buildCost
                        id
                        imageUrl
                        name
                    }
                    level3 {
                        buildCost
                        id
                        imageUrl
                        name
                    }
                    level4 {
                        buildCost
                        id
                        imageUrl
                        name
                    }
                    totalAbilitiesCost
                    totalBuildCost
                    totalBuildCostFullyUpgraded
                    towerType
                }
            }
        }
    `

    await executeTest(testQuery, ARTILLERY_LVL4())
})
