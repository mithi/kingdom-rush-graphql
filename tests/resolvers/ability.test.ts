import { createConnection, getConnection } from "typeorm"
import sAcase1 from "./__snapshots__/singleAbility/case1"
import sTcase1 from "./__snapshots__/singleTower/case1"
import { executeTest } from "./utils"

const CASES = [sTcase1, sAcase1]
beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test.each(CASES)("%s", async (_description, { testQuery, result }) => {
    await executeTest(testQuery, result())
})
