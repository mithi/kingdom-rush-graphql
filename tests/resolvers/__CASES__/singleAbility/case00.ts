import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "abilitiesById: When ability id does not exist"
const testQuery = gql`
    {
        abilityById(id: 400) {
            abilityId
            abilityName
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "abilityById": null,
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
