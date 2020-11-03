import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "buildSequenceById: When an id exists"
const testQuery = gql`
    {
        buildSequenceById(id: 23) {
            level1 {
                name
                buildCost
            }
            level2 {
                name
                buildCost
            }
            level3 {
                name
                buildCost
            }
            level4 {
                name
                buildCost
            }
            buildSequenceId
            kingdom
            towerType
            totalBuildCost
            totalAbilitiesCost
            totalBuildCostFullyUpgraded
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "buildSequenceById": Object {
          "buildSequenceId": 23,
          "kingdom": "KRO",
          "level1": Object {
            "buildCost": 100,
            "name": "defender barracks",
          },
          "level2": Object {
            "buildCost": 160,
            "name": "warden barracks",
          },
          "level3": Object {
            "buildCost": 250,
            "name": "ranger barracks",
          },
          "level4": Object {
            "buildCost": 275,
            "name": "bladesinger hall",
          },
          "totalAbilitiesCost": 1475,
          "totalBuildCost": 785,
          "totalBuildCostFullyUpgraded": 2260,
          "towerType": "BARRACKS",
        },
      },
      "errors": undefined,
      "extensions": undefined,
      "http": Object {
        "headers": Headers {
          Symbol(map): Object {},
        },
      },
    }
`
}

const testCase: [string, { testQuery: DocumentNode; result: Function }] = [
    description,
    { testQuery, result },
]

export default testCase
