require("dotenv").config()
import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "./resolvers/TowerResolver"
import { AbilityResolver } from "./resolvers/AbilityResolver"
import { BuildSequenceResolver } from "./resolvers/BuildSequenceResolver"

async function main() {
    await createConnection()
    const schema = await buildSchema({
        resolvers: [TowerResolver, AbilityResolver, BuildSequenceResolver],
        emitSchemaFile: true,
    })
    const server = new ApolloServer({ schema })
    server.listen({ port: process.env.PORT }, () =>
        console.log(
            `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
        )
    )
}

main()
