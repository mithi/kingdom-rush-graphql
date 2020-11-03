import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "abilitiesByTowerName: When tower name does not exist"
const testQuery = gql`
    {
        abilitiesByTowerName(name: "this tower does not exist") {
            abilityId
            abilityName
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "abilitiesByTowerName": Array [],
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
