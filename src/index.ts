require("dotenv").config()
import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { TowerResolver } from "./resolvers/TowerResolver"
import { populateTowers, populateMainStats } from "./populate"

async function main() {
    await createConnection()
    if (process.env.SHOULD_POPULATE) {
        console.log("Populating towers...")
        populateTowers()
        populateMainStats()
    } else {
        console.log("I did not populate the towers")
    }

    const schema = await buildSchema({ resolvers: [TowerResolver] })
    const server = new ApolloServer({ schema })
    server.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

main()
