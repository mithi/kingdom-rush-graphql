import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "buildSequenceByTowerName: When tower name exists "
const testQuery = gql`
    {
        buildSequenceByTowerName(name: "holy order") {
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
        "buildSequenceByTowerName": Object {
          "buildSequenceId": 19,
          "kingdom": "KR",
          "level1": Object {
            "buildCost": 70,
            "name": "militia barracks",
          },
          "level2": Object {
            "buildCost": 110,
            "name": "footmen barracks",
          },
          "level3": Object {
            "buildCost": 160,
            "name": "knights barracks",
          },
          "level4": Object {
            "buildCost": 230,
            "name": "holy order",
          },
          "totalAbilitiesCost": 1220,
          "totalBuildCost": 570,
          "totalBuildCostFullyUpgraded": 1790,
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
