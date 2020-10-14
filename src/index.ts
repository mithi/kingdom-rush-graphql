import { createConnection } from "typeorm"
import { Tower } from "./entity/Tower"
import { ApolloServer, gql } from "apollo-server-express"
const express = require("express")

const typeDefs = gql`
    type Query {
        getTower(name: String!): Tower
        getTowerById(id: Int): Tower
    }

    type Mutation {
        addTower(
            name: String!
            notes: String!
            level: Int!
            kingdom: String!
            towerType: String!
        ): TowerMutationResult
    }

    type TowerMutationResult {
        success: Boolean!
        message: String!
        id: Int
        name: String
    }

    type Tower {
        id: Int!
        name: String!
        notes: String!
        level: Int!
        kingdom: String!
        towerType: String!
    }
`

/**

-------------------
EXAMPLE MUTATION:  ADD A TOWER
-------------------
mutation {
  addTower(
    name: "mks"
    notes: "notes"
    level: 4
    kingdom: "kingdom rush"
    towerType: "barracks"
  ) {
    success,
    message,
    name,
    id
  }
}
------------
example result of mutation
------------

{
  "data": {
    "addTower": {
      "success": false,
      "message": "duplicate key value violates unique constraint \"UQ_70fea5a9b9cbd8b66dc86b35df2\"",
      "name": "mks",
      "id": null
    }
  }
}

{
  "data": {
    "addTower": {
      "success": true,
      "message": "Tower saved successfully",
      "name": "mkxs",
      "id": 36
    }
  }
}

-------------------
EXAMPLE QUERY
-------------------

{
	getTower(name: "mili44rry brracks") {
    id,
    name,
    level,
    towerType
  }
}

{
  getTowerById(id: 36) {
    name
    kingdom
  }
}


------------
example result of query
------------

{
  "data": {
    "getTowerById": {
      "name": "mkxs",
      "kingdom": "kingdom rush"
    }
  }
}

 ***/
const resolvers = {
    Query: {
        getTower: async (_: any, args: any) => {
            return await Tower.findOne({ where: { name: args.name } })
        },
        getTowerById: async (_: any, args: any) => {
            return await Tower.findOne({ where: { id: args.id } })
        },
    },
    Mutation: {
        addTower: async (_: any, args: any) => {
            const { name, towerType, level, kingdom, notes } = args
            try {
                const tower = Tower.create({ name, towerType, level, kingdom, notes })
                await tower.save()
                const savedTower = await Tower.findOne({ where: { name } })
                return {
                    success: true,
                    id: savedTower ? savedTower.id : null,
                    name,
                    message: "Tower saved successfully",
                }
            } catch (error) {
                console.log("Add tower error!!!", error.message)
                return {
                    success: false,
                    message: error.message,
                    name,
                }
            }
        },
    },
}

const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers })

    await createConnection()

    const app = express()

    server.applyMiddleware({ app })

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

startServer()
