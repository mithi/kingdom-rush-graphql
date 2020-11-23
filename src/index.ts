require("dotenv").config()
import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "./resolvers/TowerResolver"
import { AbilityResolver } from "./resolvers/AbilityResolver"
import { BuildSequenceResolver } from "./resolvers/BuildSequenceResolver"

const PORT = process.env.PORT || 5000

async function main() {
    await createConnection()
    const schema = await buildSchema({
        resolvers: [TowerResolver, AbilityResolver, BuildSequenceResolver],
        emitSchemaFile: true,
    })
    const server = new ApolloServer({ schema, introspection: true, playground: true })

    server
        .listen({ port: PORT })
        .then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`)
        })
        .catch(error => console.log(error))
}

main()
