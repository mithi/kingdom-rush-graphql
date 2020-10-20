import { createConnection, getConnection, getRepository } from "typeorm"
import {
    Tower,
    MainStats,
    BarracksStats,
    AttackStats,
    Ability,
    AbilityLevel,
} from "../src/models/"
import { TowerType, TowerLevel, TowerKingdom } from "../src/enums/TowerEnums"
import seed from "../src/seed"

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
    await getRepository(Tower, "test").remove(retrievedTowers[0])
    expect(await getRepository(Tower, "test").count()).toBe(0)
})

test("Store a tower and add main stats, deleting the tower would also delete main stats", async () => {
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

    const repo = getRepository(Tower, "test")
    await repo.save(tower)

    let retrievedTowers = await repo.find({
        where: {
            name: "dwarven bombard",
        },
        relations: ["mainStats"],
    })

    expect(retrievedTowers[0].name).toBe("dwarven bombard")
    expect(retrievedTowers[0].mainStats.buildCost).toBe(125)

    await repo.remove(retrievedTowers[0])
    expect(await getRepository(Tower, "test").count()).toBe(0)
    expect(await getRepository(MainStats, "test").count()).toBe(0)
})

test("Be able to store abilities and ability levels of a tower", async () => {
    let tower = new Tower()
    tower.name = "dwarven bombard"
    tower.kingdom = TowerKingdom.KR
    tower.towerType = TowerType.ARTILLERY
    tower.level = TowerLevel.LVL1

    let ability1 = new Ability()
    ability1.name = "poison arrows"
    ability1.description =
        "Poisons anemies, causing them to take True damage over a three of seconds. Effects does not stack. True damage ignores any armore or magic resistance that an enemy has. Every upgrade level increases the damage dealt per second."

    let ability1level1 = new AbilityLevel()
    ability1level1.level = 1
    ability1level1.cost = 250

    ability1.levels = [ability1level1]

    tower.abilities = [ability1]
    await getRepository(Tower, "test").save(tower)

    expect(await getRepository(Tower, "test").count()).toBe(1)
    expect(await getRepository(Ability, "test").count()).toBe(1)
    expect(await getRepository(AbilityLevel, "test").count()).toBe(1)

    let retrievedTowers = await getRepository(Tower, "test").find({
        where: {
            name: "dwarven bombard",
        },
        relations: ["abilities"],
    })

    let abilities = await getRepository(Ability, "test").find({
        where: {
            name: retrievedTowers[0].abilities[0].name,
        },
        relations: ["levels"],
    })

    expect(retrievedTowers[0].name).toBe("dwarven bombard")
    expect(retrievedTowers[0].abilities[0].name).toBe("poison arrows")
    expect(abilities[0].levels[0].cost).toBe(250)

    await getRepository(Tower, "test").remove(retrievedTowers[0])
    expect(await getRepository(Tower, "test").count()).toBe(0)
    expect(await getRepository(Ability, "test").count()).toBe(0)
    expect(await getRepository(AbilityLevel, "test").count()).toBe(0)
})

test("Seed() should populate distinct rows in the tables: Towers, main_stats, barack_stats", async () => {
    await seed({ dbName: "test", verbose: false })

    const towerCount = Number(
        (
            await getRepository(Tower, "test").query(
                `SELECT COUNT(*) FROM (SELECT DISTINCT name, kingdom FROM "Towers") as kingdom`
            )
        )[0].count
    )

    const mainStatsCount = Number(
        (
            await getRepository(MainStats, "test").query(
                `SELECT COUNT(DISTINCT "towerId") FROM main_stats`
            )
        )[0].count
    )

    const barracksStatsCount = Number(
        (
            await getRepository(BarracksStats, "test").query(
                `SELECT COUNT(DISTINCT "towerId") FROM barracks_stats`
            )
        )[0].count
    )

    const attackStatsCount = Number(
        (
            await getRepository(AttackStats, "test").query(
                `SELECT COUNT(DISTINCT "towerId") FROM attack_stats`
            )
        )[0].count
    )

    expect(towerCount).toBe(104)
    expect(mainStatsCount).toBe(104)
    expect(barracksStatsCount).toBe(27)
    expect(attackStatsCount).toBe(77)

    // reseeding shouldn't change the rows
    // because the table wouldn't allow for duplication
    await seed({ dbName: "test", verbose: false })
    expect(towerCount).toBe(await getRepository(Tower, "test").count())
    expect(mainStatsCount).toBe(await getRepository(MainStats, "test").count())
    expect(barracksStatsCount).toBe(await getRepository(BarracksStats, "test").count())
    expect(attackStatsCount).toBe(await getRepository(AttackStats, "test").count())
})
