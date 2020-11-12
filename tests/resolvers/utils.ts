import { buildSchema } from "type-graphql"
import { ApolloServer } from "apollo-server"
import { createTestClient } from "apollo-server-testing"
import { DocumentNode } from "graphql"
import { AbilityResolver } from "../../src/resolvers/AbilityResolver"
import { TowerResolver } from "../../src/resolvers/TowerResolver"
import { BuildSequenceResolver } from "../../src/resolvers/BuildSequenceResolver"

export const executeTest = async (testQuery: DocumentNode, correctAnswer: string) => {
    const schema = await buildSchema({
        resolvers: [AbilityResolver, TowerResolver, BuildSequenceResolver],
    })
    const { query } = createTestClient(new ApolloServer({ schema }))

    const result = await query({ query: testQuery })
    expect(result).toMatchInlineSnapshot(correctAnswer)
}
