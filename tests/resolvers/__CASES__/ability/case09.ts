import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "abilityByName: When ability name does NOT exist"
const testQuery = gql`
    {
        abilityByName(name: "Biggies") {
            abilityId
            abilityName
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "abilityByName": null,
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
