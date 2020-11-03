import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "abilitiesByTowerId: When tower id exists but has no abilities"
const testQuery = gql`
    {
        abilitiesByTowerId(id: 23) {
            abilityId
            abilityName
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "abilitiesByTowerId": Array [],
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
