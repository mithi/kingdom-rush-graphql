import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "./resolvers/TowerResolver"
import { AbilityResolver } from "./resolvers/AbilityResolver"

async function main() {
    await createConnection()
    const schema = await buildSchema({
        resolvers: [TowerResolver, AbilityResolver],
        emitSchemaFile: true,
    })
    const server = new ApolloServer({ schema })
    server.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

main()
