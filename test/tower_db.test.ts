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
    const TOWER_REPO = getRepository(Tower, "test")

    const tower = {
        name: "Militia Barracks",
        towerType: TowerType.BARRACKS,
        level: TowerLevel.LVL1,
        kingdom: TowerKingdom.KR,
    }

    await TOWER_REPO.insert(tower)
    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: "Militia Barracks",
        },
    })

    expect(retrievedTowers[0].name).toBe("Militia Barracks")
    await TOWER_REPO.remove(retrievedTowers[0])
    expect(await TOWER_REPO.count()).toBe(0)
})

test("Store a tower and add main stats, deleting the tower would also delete main stats", async () => {
    const TOWER_REPO = getRepository(Tower, "test")
    const MAIN_STATS_REPO = getRepository(MainStats, "test")

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

    await TOWER_REPO.save(tower)

    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: "dwarven bombard",
        },
        relations: ["mainStats"],
    })

    expect(retrievedTowers[0].name).toBe("dwarven bombard")
    expect(retrievedTowers[0].mainStats.buildCost).toBe(125)

    await TOWER_REPO.remove(retrievedTowers[0])
    expect(await TOWER_REPO.count()).toBe(0)
    expect(await MAIN_STATS_REPO.count()).toBe(0)
})

test("Be able to store abilities and ability levels of a tower", async () => {
    const TOWER_REPO = getRepository(Tower, "test")
    const ABILITY_REPO = getRepository(Ability, "test")
    const ABILITY_LEVEL_REPO = getRepository(AbilityLevel, "test")

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
    await TOWER_REPO.save(tower)

    expect(await TOWER_REPO.count()).toBe(1)
    expect(await ABILITY_REPO.count()).toBe(1)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(1)

    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: "dwarven bombard",
        },
        relations: ["abilities"],
    })

    let abilities = await ABILITY_REPO.find({
        where: {
            name: retrievedTowers[0].abilities[0].name,
        },
        relations: ["levels"],
    })

    expect(retrievedTowers[0].name).toBe("dwarven bombard")
    expect(retrievedTowers[0].abilities[0].name).toBe("poison arrows")
    expect(abilities[0].levels[0].cost).toBe(250)

    await TOWER_REPO.remove(retrievedTowers[0])
    expect(await TOWER_REPO.count()).toBe(0)
    expect(await ABILITY_REPO.count()).toBe(0)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(0)
})

test("Seed() should populate distinct rows in the tables: Towers, main_stats, barracks_stats", async () => {
    const TOWER_REPO = getRepository(Tower, "test")
    const MAIN_STATS_REPO = getRepository(MainStats, "test")
    const BARRACKS_STATS_REPO = getRepository(BarracksStats, "test")
    const ATTACK_STATS_REPO = getRepository(AttackStats, "test")

    await seed({ dbName: "test", verbose: false })

    const towerCountQueryResult = await TOWER_REPO.query(
        `SELECT COUNT(*) FROM (SELECT DISTINCT name, kingdom FROM "Towers") as kingdom`
    )
    const mainStatsCountQueryResult = await MAIN_STATS_REPO.query(
        `SELECT COUNT(DISTINCT "towerId") FROM main_stats`
    )

    const barracksCountQueryResult = await BARRACKS_STATS_REPO.query(
        `SELECT COUNT(DISTINCT "towerId") FROM barracks_stats`
    )

    const attackStatsCountQuery = await ATTACK_STATS_REPO.query(
        `SELECT COUNT(DISTINCT "towerId") FROM attack_stats`
    )

    const towerCount = Number(towerCountQueryResult[0].count)
    const mainStatsCount = Number(mainStatsCountQueryResult[0].count)
    const barracksStatsCount = Number(barracksCountQueryResult[0].count)
    const attackStatsCount = Number(attackStatsCountQuery[0].count)

    expect(towerCount).toBe(104)
    expect(mainStatsCount).toBe(104)
    expect(barracksStatsCount).toBe(27)
    expect(attackStatsCount).toBe(77)

    // reseeding shouldn't change the rows
    // because the table wouldn't allow for duplication
    await seed({ dbName: "test", verbose: false })
    expect(towerCount).toBe(await TOWER_REPO.count())
    expect(mainStatsCount).toBe(await MAIN_STATS_REPO.count())
    expect(barracksStatsCount).toBe(await BARRACKS_STATS_REPO.count())
    expect(attackStatsCount).toBe(await ATTACK_STATS_REPO.count())
})
