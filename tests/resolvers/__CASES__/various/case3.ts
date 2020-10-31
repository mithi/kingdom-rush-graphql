import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description =
    "3. Be able to get attack towers sorted by fire interval in descending order"

const testQuery = gql`
    {
        attackTowers(
            sortDefinition: [
                { column: fireInterval, sortOrder: DESCEND }
                { column: towerType, sortOrder: ASCEND }
            ]
        ) {
            fireInterval
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
            "fireInterval": 4,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 4,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 4,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 4,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3.5,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3.5,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 2.8,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 2.3,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2.3,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2.3,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2.3,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2.2,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 2,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.8,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.8,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.8,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.8,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.7,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.45,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.45,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.45,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.45,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.4,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.4,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.4,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.4,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 0.8,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.8,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.8,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.8,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.5,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.5,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.5,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.4,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.4,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.3,
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
