import { createConnection, getConnection, getRepository } from "typeorm"
import { Tower, MainStats, Ability, AbilityLevel } from "../src/models/"
import { TowerType, TowerLevel, TowerKingdom } from "../src/definitions/enums"

const DB_NAME = "empty_test"

const getExampleTower = (): Tower => {
    let tower = new Tower()
    tower.name = "dwarven bombard"
    tower.kingdom = TowerKingdom.KR
    tower.towerType = TowerType.ARTILLERY
    tower.level = TowerLevel.LVL1
    return tower
}

const getExampleMainStats = (): MainStats => {
    let mainStats = new MainStats()
    mainStats.buildCost = 125
    mainStats.damageMinimum = 8
    mainStats.damageMaximum = 15
    return mainStats
}

const EXAMPLE_TOWER_DATA = {
    name: "Militia Barracks",
    towerType: TowerType.BARRACKS,
    level: TowerLevel.LVL1,
    kingdom: TowerKingdom.KR,
}

beforeAll(async () => {
    await createConnection("empty_test")
})

afterAll(async () => {
    await getConnection("empty_test").close()
})

test("1. Be able to store, fetch, and remove a tower", async () => {
    const TOWER_REPO = getRepository(Tower, DB_NAME)

    /********************
     * Our example tower shouldn't exist yet in our empty test database
     ********************/
    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: EXAMPLE_TOWER_DATA.name,
        },
    })

    expect(retrievedTowers.length).toBe(0)

    /********************
     * We shoud ne able to successfully insert the tower,
     * increasing entry count of table by one
     ********************/
    await TOWER_REPO.insert(EXAMPLE_TOWER_DATA)
    expect(await TOWER_REPO.count()).toBe(1)

    /********************
     * We should able to find our inserted tower by name
     ********************/
    retrievedTowers = await TOWER_REPO.find({
        where: {
            name: EXAMPLE_TOWER_DATA.name,
        },
    })

    expect(retrievedTowers.length).toBe(1)

    const retrievedTower = retrievedTowers[0]
    expect(retrievedTower.name).toBe(EXAMPLE_TOWER_DATA.name)

    /********************
     * We should be able to remove the tower we inserted
     ********************/
    await TOWER_REPO.remove(retrievedTower)
    expect(await TOWER_REPO.count()).toBe(0)
})

test("2. Store a tower and add main stats deleting the tower would also delete main stats", async () => {
    const TOWER_REPO = getRepository(Tower, DB_NAME)
    const MAIN_STATS_REPO = getRepository(MainStats, DB_NAME)

    let tower = getExampleTower()
    let mainStats = getExampleMainStats()
    tower.mainStats = mainStats

    /********************
     * Our example tower shouldn't exist in our empty database yet
     * It is currently just in memory
     ********************/
    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: tower.name,
        },
    })

    expect(retrievedTowers.length).toBe(0)

    /********************
     * Saving our tower should also save its main stats
     ********************/
    await TOWER_REPO.save(tower)
    expect(await TOWER_REPO.count()).toBe(1)
    expect(await MAIN_STATS_REPO.count()).toBe(1)

    /********************
     * Querying the tower should also load its main stats
     * With the expected column entries
     ********************/
    retrievedTowers = await TOWER_REPO.find({
        where: {
            name: tower.name,
        },
        relations: ["mainStats"],
    })

    expect(retrievedTowers.length).toBe(1)

    const retrievedTower = retrievedTowers[0]
    expect(retrievedTower.name).toBe(tower.name)
    expect(retrievedTower.mainStats.buildCost).toBe(tower.mainStats.buildCost)

    /********************
     * Removing the tower should also remove its mainstats
     ********************/
    await TOWER_REPO.remove(retrievedTower)
    expect(await TOWER_REPO.count()).toBe(0)
    expect(await MAIN_STATS_REPO.count()).toBe(0)
})

test("3. Be able to store abilities and ability levels of a tower, deleting tower would remove ability and ability levels", async () => {
    const TOWER_REPO = getRepository(Tower, DB_NAME)
    const ABILITY_REPO = getRepository(Ability, DB_NAME)
    const ABILITY_LEVEL_REPO = getRepository(AbilityLevel, DB_NAME)

    /********************
     * We should start with an empty database
     ********************/
    expect(await TOWER_REPO.count()).toBe(0)
    expect(await ABILITY_REPO.count()).toBe(0)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(0)

    /********************
     * Saving a tower should also save its
     * ability and ability levels
     ********************/
    let tower = getExampleTower()

    let ability1 = new Ability()
    ability1.name = "poison arrows"
    ability1.description = "Poisons enemies"

    let ability1level1 = new AbilityLevel()
    ability1level1.level = 1
    ability1level1.cost = 250
    ability1.levels = [ability1level1]
    tower.abilities = [ability1]

    await TOWER_REPO.save(tower)

    expect(await TOWER_REPO.count()).toBe(1)
    expect(await ABILITY_REPO.count()).toBe(1)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(1)

    /********************
     * Querying the tower should also load its main stats
     ********************/
    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: tower.name,
        },
        relations: ["abilities"],
    })

    expect(retrievedTowers.length).toBe(1)

    /********************
     * Querying an ability should also load its levels
     ********************/
    let retrievedTower = retrievedTowers[0]
    let abilities = await ABILITY_REPO.find({
        where: {
            name: retrievedTower.abilities[0].name,
        },
        relations: ["levels"],
    })

    expect(retrievedTower.name).toBe(tower.name)
    expect(retrievedTower.abilities[0].name).toBe(ability1.name)
    expect(abilities[0].levels[0].cost).toBe(250)

    /********************
     * Removing a tower should also remove its ability and ability levels
     ********************/
    await TOWER_REPO.remove(retrievedTower)
    expect(await TOWER_REPO.count()).toBe(0)
    expect(await ABILITY_REPO.count()).toBe(0)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(0)
})
