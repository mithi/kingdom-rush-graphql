require("dotenv").config()
import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "./resolvers/TowerResolver"
import { AbilityResolver } from "./resolvers/AbilityResolver"
import { BuildSequenceResolver } from "./resolvers/BuildSequenceResolver"
const express = require("express")

const PORT = process.env.PORT || 5000

const app = express()

app.get("/", (_: any, response: any) => {
    return response.redirect("https://github.com/mithi/kingdom-rush-graphql")
})

app.get("*", (_: any, response: any) => {
    return response.redirect("https://github.com/mithi/kingdom-rush-graphql")
})

async function main() {
    await createConnection()
    const schema = await buildSchema({
        resolvers: [TowerResolver, AbilityResolver, BuildSequenceResolver],
        emitSchemaFile: true,
    })
    const server = new ApolloServer({ schema })
    server.applyMiddleware({ app })

    app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready: http://localhost:${PORT}${server.graphqlPath}`)
    )
}

main()
