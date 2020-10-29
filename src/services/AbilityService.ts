import { AbilityArgs } from "../definitions/argsAbility"
import { getConnection } from "typeorm"
import { buildFilterExpression, buildSortExpression } from "./utils"

const TABLE_EXPRESSION = `SELECT
ability_table."towerName" AS "towerName",
ability_table."abilityName" AS "abilityName",
ability_table."towerImageUrl" AS "towerImageUrl",
ability_table."abilityDescription",
ability_table."totalAbilityCost",
ability_table."towerId",
ability_table."abilityId",
ability_table.kingdom,
ability_table."towerType",
ability_table."numberOfLevels",
ability_table."levelCosts",
(m4."buildCost" + m3."buildCost" + m2."buildCost" + m1."buildCost" + "totalAbilityCost") AS "totalCostWithTowers"
FROM build_sequence as bs
INNER JOIN "Towers" AS t4 ON t4.id = bs."level4Id" INNER JOIN main_stats AS m4 ON t4.id = m4.id
INNER JOIN "Towers" AS t3 ON t3.id = bs."level3Id" INNER JOIN main_stats AS m3 ON t3.id = m3.id
INNER JOIN "Towers" AS t2 ON t2.id = bs."level2Id" INNER JOIN main_stats AS m2 ON t2.id = m2.id
INNER JOIN "Towers" AS t1 ON t1.id = bs."level1Id" INNER JOIN main_stats AS m1 ON t1.id = m1.id
INNER JOIN (
    SELECT
        "Towers".name AS "towerName",
        "Towers"."imageUrl" AS "towerImageUrl",
        ability.name AS "abilityName",
        ability.description AS "abilityDescription",
        SUM(cost) AS "totalAbilityCost",
        "Towers".id AS "towerId",
         ability.id AS "abilityId",
        "Towers".kingdom AS kingdom,
        "Towers"."towerType" AS "towerType",
        COUNT(ability_level.level) AS "numberOfLevels",
        ARRAY_AGG (ability_level.cost) "levelCosts"
    FROM "Towers"
        INNER JOIN ability ON ability."towerId" = "Towers".id
        INNER JOIN ability_level ON ability.id = ability_level."abilityId"
    GROUP BY "Towers".name, ability.name, "Towers".id, ability.id
) AS ability_table ON t4.name = ability_table."towerName"
`

export class AbilityService {
    async abilities(args: AbilityArgs) {
        const { onlyKingdoms, onlyTowerTypes, take, skip, sortDefinition } = args
        // we know the query won't result anything if one of the parameters don't have value
        const kingdoms = buildFilterExpression(onlyKingdoms, `t4.kingdom`)
        const towerTypes = buildFilterExpression(onlyTowerTypes, `t4."towerType"`)
        const pageExpr = `LIMIT ${take} OFFSET ${skip}`
        const sortColumns = buildSortExpression(sortDefinition)
        const sortExpr = `ORDER BY ${sortColumns}`
        const filterExpr = `WHERE (${kingdoms}) AND (${towerTypes})`
        const queryExpression = `${TABLE_EXPRESSION} ${filterExpr} ${sortExpr} ${pageExpr}`
        console.log(queryExpression)
        const results = await getConnection().query(queryExpression)
        return results
    }

    async abilitiesByTowerId(id: Number) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE t4.id = ${id}`
        const results = await getConnection().query(queryExpression)
        return results
    }

    async abilitiesByTowerName(name: String) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE t4.name = '${name}'`
        const results = await getConnection().query(queryExpression)
        return results
    }

    async abilityById(id: Number) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE ability_table."abilityId" = '${id}'`
        const results = await getConnection().query(queryExpression)
        const result = results.length !== 0 ? results[0] : null
        return result
    }

    async abilityByName(name: String) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE ability_table."abilityName" = '${name}'`
        const results = await getConnection().query(queryExpression)
        const result = results.length !== 0 ? results[0] : null
        return result
    }
}
