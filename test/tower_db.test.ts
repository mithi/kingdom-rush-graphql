import { createConnection, getConnection, getRepository } from "typeorm"
import { Tower } from "../src/models/Tower"
import { TowerType, TowerLevel, TowerKingdom } from "../src/enums/TowerEnums"

beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test("Store tower and fetch it", async () => {
    const tower = {
        name: "Militia Barracks",
        towerType: TowerType.BARRACKS,
        level: TowerLevel.LVL1,
        kingdom: TowerKingdom.KR,
    }

    await getRepository(Tower, "test").insert(tower)
    let retrievedTowers = await getRepository(Tower, "test").find({
        where: {
            name: "Militia Barracks",
        },
    })

    expect(retrievedTowers[0].name).toBe("Militia Barracks")
})
