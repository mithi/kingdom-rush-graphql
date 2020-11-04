import { createConnection, getConnection, getRepository, QueryFailedError } from "typeorm"
import {
    Tower,
    Ability,
    MainStats,
    BarracksStats,
    AttackStats,
    AbilityLevel,
} from "../src/models/"
import { TowerType, TowerLevel, TowerKingdom } from "../src/definitions/enums"

const DB_NAME = "empty_test"
const EXAMPLE_TOWER_NAME = "ANOTHER UNIQUE TOWER"

const getTowerRepo = () => getRepository(Tower, DB_NAME)
const getAbilityRepo = () => getRepository(Ability, DB_NAME)
const getAbilityLevelRepo = () => getRepository(AbilityLevel, DB_NAME)
const getMainStatsRepo = () => getRepository(MainStats, DB_NAME)
const getBarracksStatsRepo = () => getRepository(BarracksStats, DB_NAME)
const getAttackStatsRepo = () => getRepository(AttackStats, DB_NAME)

function randomInt(min = 0, max = 1000) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

beforeAll(async () => {
    await createConnection(DB_NAME)
})

afterAll(async () => {
    await getConnection(DB_NAME).close()
})

test("1. Name-kingdom pair should be unique", async () => {
    const t = {
        name: EXAMPLE_TOWER_NAME,
        towerType: TowerType.BARRACKS,
        level: TowerLevel.LVL4,
        kingdom: TowerKingdom.KR,
    }

    await getTowerRepo().insert(t)
    const t2 = {
        name: t.name,
        kingdom: t.kingdom,
        level: TowerLevel.LVL4,
        towerType: TowerType.ARCHER,
    }

    const tryInsertTowersSameNameKingdom = async () => {
        await getTowerRepo().insert(t2)
    }

    expect(tryInsertTowersSameNameKingdom()).rejects.toThrowError(QueryFailedError)
})

test("2. Ability name should be unique. ", async () => {
    const tower = await getTowerRepo().findOne()

    const a1 = {
        tower,
        name: "Same Ability Name",
        description: "Ability Description",
    }

    await getAbilityRepo().insert(a1)

    const a2 = {
        tower,
        name: a1.name,
        description: "Ability Description 2",
    }

    const tryInsertAbilitySameName = async () => {
        await getAbilityRepo().insert(a2)
    }

    expect(tryInsertAbilitySameName()).rejects.toThrowError(QueryFailedError)
})

test("3. towerId of main_stats should be unique. ", async () => {
    const tower = await getTowerRepo().findOne()
    const m1 = {
        tower,
        buildCost: randomInt(),
        damageMinimum: randomInt(),
        damageMaximum: randomInt(),
    }

    await getMainStatsRepo().insert(m1)

    const m2 = {
        tower,
        buildCost: randomInt(),
        damageMinimum: randomInt(),
        damageMaximum: randomInt(),
    }

    const trySameTower = async () => {
        await getMainStatsRepo().insert(m2)
    }

    expect(trySameTower()).rejects.toThrowError(QueryFailedError)
})

test("4. towerId of barracks stats should be unique. ", async () => {
    const tower = await getTowerRepo().findOne()

    await getBarracksStatsRepo().insert({
        tower,
        numberOfUnits: randomInt(),
        health: randomInt(),
        armor: randomInt(),
        respawnInterval: randomInt(),
    })

    const trySameTower = async () => {
        await getBarracksStatsRepo().insert({
            tower,
            numberOfUnits: randomInt(),
            health: randomInt(),
            armor: randomInt(),
            respawnInterval: randomInt(),
        })
    }

    expect(trySameTower()).rejects.toThrowError(QueryFailedError)
})

test("5. towerId of attack stats should be unique. ", async () => {
    const tower = await getTowerRepo().findOne()

    await getAttackStatsRepo().insert({
        tower,
        range: randomInt(),
        fireInterval: randomInt(),
    })

    const trySameTower = async () => {
        await getAttackStatsRepo().insert({
            tower,
            range: randomInt(),
            fireInterval: randomInt(),
        })
    }

    expect(trySameTower()).rejects.toThrowError(QueryFailedError)
})

test("6. Ability name-level pair should be unique. ", async () => {
    let a = await getAbilityRepo().findOne()

    let level = randomInt()
    await getAbilityLevelRepo().insert({
        ability: a,
        level,
        cost: randomInt(),
    })

    const trySameAbilityNameLevel = async () => {
        await getAbilityLevelRepo().insert({
            ability: a,
            level,
            cost: randomInt(),
        })
    }

    expect(trySameAbilityNameLevel()).rejects.toThrowError(QueryFailedError)
})

// 7. Build sequence level 4 tower id should be unique
