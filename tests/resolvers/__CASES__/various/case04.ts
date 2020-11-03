import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description =
    "barracksTowers: Be able to get barracks, with the more soldiers first, then sorted by kingdom, then sorted by name."

const testQuery = gql`
    {
        barracksTowers(
            sortDefinition: [
                { column: numberOfUnits, sortOrder: DESCEND }
                { column: kingdom, sortOrder: DESCEND }
                { column: name, sortOrder: ASCEND }
            ]
        ) {
            name
            kingdom
            numberOfUnits
            towerType
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "barracksTowers": Array [
          Object {
            "kingdom": "KRV",
            "name": "orc warriors den, 1",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "orc warriors den, 2",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "orc warriors den, 3",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "orc warriors den, 4",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRO",
            "name": "bladesinger hall",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRO",
            "name": "defender barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRO",
            "name": "ranger barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRO",
            "name": "warden barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRF",
            "name": "assassin's guild",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRF",
            "name": "footmen barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRF",
            "name": "knights barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRF",
            "name": "knights templar",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRF",
            "name": "militia barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KR",
            "name": "barbarian mead hall",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KR",
            "name": "footmen barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KR",
            "name": "holy order",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KR",
            "name": "knights barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KR",
            "name": "militia barracks",
            "numberOfUnits": 3,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "dark knights, 1",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "dark knights, 2",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "dark knights, 3",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "dark knights, 4",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "elite harassers, 1",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "elite harassers, 2",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "elite harassers, 3",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRV",
            "name": "elite harassers, 4",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
          },
          Object {
            "kingdom": "KRO",
            "name": "forest keepers",
            "numberOfUnits": 2,
            "towerType": "BARRACKS",
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
