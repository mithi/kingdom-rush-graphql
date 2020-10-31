import { createConnection, getConnection } from "typeorm"
import * as case1 from "./__snapshots__/singleTower/case1"
import { executeTest } from "./utils"

beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test(case1.description, async () => {
    await executeTest(case1.testQuery, case1.result())
})
