import { createConnection, getConnection, getRepository } from "typeorm"
import { Tower } from "../src/entity/Tower"
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
        notes:
            " This tower spawns three militia which block and attack enemies. Militia are the most basic soldier available, merely civilians with very little training, armor, and weapons. However, with additional tower support, they can hold their own against even a much larger army. They can fall pretty quickly to Orcs, so it appears that they aren't as tough as the tower description says.",
    }

    await getRepository(Tower, "test").insert(tower)
    let retrievedTowers = await getRepository(Tower, "test").find({
        where: {
            name: "Militia Barracks",
        },
    })

    expect(retrievedTowers[0].name).toBe("Militia Barracks")
})
