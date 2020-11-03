import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description =
    "towers: Be able to get towers, ids would be sorted in ascending order by default"

const testQuery = gql`
    {
        towers {
            id
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "towers": Array [
          Object {
            "id": 1,
          },
          Object {
            "id": 2,
          },
          Object {
            "id": 3,
          },
          Object {
            "id": 4,
          },
          Object {
            "id": 5,
          },
          Object {
            "id": 6,
          },
          Object {
            "id": 7,
          },
          Object {
            "id": 8,
          },
          Object {
            "id": 9,
          },
          Object {
            "id": 10,
          },
          Object {
            "id": 11,
          },
          Object {
            "id": 12,
          },
          Object {
            "id": 13,
          },
          Object {
            "id": 14,
          },
          Object {
            "id": 15,
          },
          Object {
            "id": 16,
          },
          Object {
            "id": 17,
          },
          Object {
            "id": 18,
          },
          Object {
            "id": 19,
          },
          Object {
            "id": 20,
          },
          Object {
            "id": 21,
          },
          Object {
            "id": 22,
          },
          Object {
            "id": 23,
          },
          Object {
            "id": 24,
          },
          Object {
            "id": 25,
          },
          Object {
            "id": 26,
          },
          Object {
            "id": 27,
          },
          Object {
            "id": 28,
          },
          Object {
            "id": 29,
          },
          Object {
            "id": 30,
          },
          Object {
            "id": 31,
          },
          Object {
            "id": 32,
          },
          Object {
            "id": 33,
          },
          Object {
            "id": 34,
          },
          Object {
            "id": 35,
          },
          Object {
            "id": 36,
          },
          Object {
            "id": 37,
          },
          Object {
            "id": 38,
          },
          Object {
            "id": 39,
          },
          Object {
            "id": 40,
          },
          Object {
            "id": 41,
          },
          Object {
            "id": 42,
          },
          Object {
            "id": 43,
          },
          Object {
            "id": 44,
          },
          Object {
            "id": 45,
          },
          Object {
            "id": 46,
          },
          Object {
            "id": 47,
          },
          Object {
            "id": 48,
          },
          Object {
            "id": 49,
          },
          Object {
            "id": 50,
          },
          Object {
            "id": 51,
          },
          Object {
            "id": 52,
          },
          Object {
            "id": 53,
          },
          Object {
            "id": 54,
          },
          Object {
            "id": 55,
          },
          Object {
            "id": 56,
          },
          Object {
            "id": 57,
          },
          Object {
            "id": 58,
          },
          Object {
            "id": 59,
          },
          Object {
            "id": 60,
          },
          Object {
            "id": 61,
          },
          Object {
            "id": 62,
          },
          Object {
            "id": 63,
          },
          Object {
            "id": 64,
          },
          Object {
            "id": 65,
          },
          Object {
            "id": 66,
          },
          Object {
            "id": 67,
          },
          Object {
            "id": 68,
          },
          Object {
            "id": 69,
          },
          Object {
            "id": 70,
          },
          Object {
            "id": 71,
          },
          Object {
            "id": 72,
          },
          Object {
            "id": 73,
          },
          Object {
            "id": 74,
          },
          Object {
            "id": 75,
          },
          Object {
            "id": 76,
          },
          Object {
            "id": 77,
          },
          Object {
            "id": 78,
          },
          Object {
            "id": 79,
          },
          Object {
            "id": 80,
          },
          Object {
            "id": 81,
          },
          Object {
            "id": 82,
          },
          Object {
            "id": 83,
          },
          Object {
            "id": 84,
          },
          Object {
            "id": 85,
          },
          Object {
            "id": 86,
          },
          Object {
            "id": 87,
          },
          Object {
            "id": 88,
          },
          Object {
            "id": 89,
          },
          Object {
            "id": 90,
          },
          Object {
            "id": 91,
          },
          Object {
            "id": 92,
          },
          Object {
            "id": 93,
          },
          Object {
            "id": 94,
          },
          Object {
            "id": 95,
          },
          Object {
            "id": 96,
          },
          Object {
            "id": 97,
          },
          Object {
            "id": 98,
          },
          Object {
            "id": 99,
          },
          Object {
            "id": 100,
          },
          Object {
            "id": 101,
          },
          Object {
            "id": 102,
          },
          Object {
            "id": 103,
          },
          Object {
            "id": 104,
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
