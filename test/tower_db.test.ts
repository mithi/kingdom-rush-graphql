import { createConnection, getConnection, getRepository } from "typeorm"
import { Tower } from "../src/models/Tower"
import { TowerType, TowerLevel, TowerKingdom } from "../src/enums/TowerEnums"
import { MainStats } from "../src/models/MainStats"

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

test("Store a tower and add main stats, when removed main stats should also be deleted", async () => {
    let tower = new Tower()
    tower.name = "dwarven bombard"
    tower.kingdom = TowerKingdom.KR
    tower.towerType = TowerType.ARTILLERY
    tower.level = TowerLevel.LVL1
    let mainStats = new MainStats()
    mainStats.buildCost = 125
    mainStats.damageMinimum = 8
    mainStats.damageMaximum = 15
    tower.mainStats = mainStats
    const repo = await getRepository(Tower, "test")
    await repo.save(tower)
    let retrievedTowers = await repo.find({
        where: {
            name: "dwarven bombard",
        },
        relations: ["mainStats"],
    })

    expect(retrievedTowers[0].name).toBe("dwarven bombard")
    expect(retrievedTowers[0].mainStats.buildCost).toBe(125)

    // currently when you remove a tower, it doesn't automatically delete the stats
    // even though you put onDelete : true
    // try: Put your @JoinColumn() on the inverse side (on MainStats)
    // https://github.com/typeorm/typeorm/issues/3218
    // https://github.com/typeorm/typeorm/issues/1460
    await repo.remove(retrievedTowers[0])
    console.log(await getRepository(MainStats, "test").find())
})
