import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description =
    "2. Be able to get attack towers, by default result will be sorted by id in ascending order"

const testQuery = gql`
    {
        attackTowers {
            towerType
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "attackTowers": Array [
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARCHER",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "ARTILLERY",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
          Object {
            "towerType": "MAGE",
          },
        ],
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
