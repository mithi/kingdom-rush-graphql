import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "buildSequenceByTowerId: When the towerId exists"
const testQuery = gql`
    {
        buildSequenceByTowerId(id: 39) {
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
        "buildSequenceByTowerId": Object {
          "buildSequenceId": 15,
          "kingdom": "KRF",
          "level1": Object {
            "buildCost": 70,
            "name": "archer tower",
          },
          "level2": Object {
            "buildCost": 110,
            "name": "marksman tower",
          },
          "level3": Object {
            "buildCost": 160,
            "name": "sharpshooter tower",
          },
          "level4": Object {
            "buildCost": 230,
            "name": "crossbow fort",
          },
          "totalAbilitiesCost": 1150,
          "totalBuildCost": 570,
          "totalBuildCostFullyUpgraded": 1720,
          "towerType": "ARCHER",
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
