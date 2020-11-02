# Format for test case files

```ts
import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = " "
const testQuery = gql``

const result = () => {
    return `
`
}

const testCase: [string, { testQuery: DocumentNode; result: Function }] = [
    description,
    { testQuery, result },
]

export default testCase
```
