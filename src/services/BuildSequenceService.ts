import { BuildSequenceArgs } from "../definitions/argsBuildSequence"
import { getConnection } from "typeorm"
import { buildFilterExpression, buildSortExpression } from "./utils"
import { convertToBuildSequenceShape } from "./buildSequenceUtils"

const TABLE_EXPRESSION = `SELECT
bs.id AS "buildSequenceId",
t4.kingdom AS kingdom,
t4."towerType" AS "towerType",
"level4Id", t4.name AS "l4Name", m4."buildCost" AS "l4BuildCost", t4."imageUrl" AS "l4ImageUrl",
"level3Id", t3.name AS "l3Name", m3."buildCost" AS "l3BuildCost", t3."imageUrl" AS "l3ImageUrl",
"level2Id", t2.name AS "l2Name", m2."buildCost" AS "l2BuildCost", t2."imageUrl" AS "l2ImageUrl",
"level1Id", t1.name AS "l1Name", m1."buildCost" AS "l1BuildCost", t1."imageUrl" AS "l1ImageUrl",
m4."buildCost" + m3."buildCost" + m2."buildCost" + m1."buildCost" AS "totalBuildCost",
abilities_cost AS "totalAbilitiesCost",
(m4."buildCost" + m3."buildCost" + m2."buildCost" + m1."buildCost" + abilities_cost) AS "totalBuildCostFullyUpgraded"
FROM build_sequence as bs
INNER JOIN "Towers" AS t4 ON t4.id = bs."level4Id" INNER JOIN main_stats AS m4 ON t4.id = m4.id
INNER JOIN "Towers" AS t3 ON t3.id = bs."level3Id" INNER JOIN main_stats AS m3 ON t3.id = m3.id
INNER JOIN "Towers" AS t2 ON t2.id = bs."level2Id" INNER JOIN main_stats AS m2 ON t2.id = m2.id
INNER JOIN "Towers" AS t1 ON t1.id = bs."level1Id" INNER JOIN main_stats AS m1 ON t1.id = m1.id
INNER JOIN (

SELECT
tower_abilities.tower_name,
SUM(tower_abilities.total_ability_cost) AS abilities_cost
FROM (
    SELECT "Towers".name AS tower_name, ability.name AS ability_name, SUM(cost) AS total_ability_cost
    FROM "Towers"
        INNER JOIN ability ON ability."towerId" = "Towers".id
        INNER JOIN ability_level ON ability.id = "abilityId"
    GROUP BY "Towers".name, ability_name
) AS tower_abilities
GROUP BY tower_abilities.tower_name
) AS ta_cost ON t4.name = ta_cost.tower_name
`

export class BuildSequenceService {
    async buildSequences(args: BuildSequenceArgs) {
        const { onlyKingdoms, onlyTowerTypes, take, skip, sortDefinition } = args
        const kingdoms = buildFilterExpression(onlyKingdoms, `t4.kingdom`)
        const towerTypes = buildFilterExpression(onlyTowerTypes, `t4."towerType"`)
        const pageExpr = `LIMIT ${take} OFFSET ${skip}`
        const sortColumns = buildSortExpression(sortDefinition)
        const sortExpr = `ORDER BY ${sortColumns}`
        const filterExpr = `WHERE (${kingdoms}) AND (${towerTypes})`
        const queryExpression = `${TABLE_EXPRESSION} ${filterExpr} ${sortExpr} ${pageExpr}`
        const results = await getConnection().query(queryExpression)
        return convertToBuildSequenceShape(results)
    }

    async buildSequenceById(id: Number) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE bs.id = ${id}`
        const results = await getConnection().query(queryExpression)
        const result = results.length !== 0 ? results[0] : null
        if (result === null) {
            return null
        }
        return convertToBuildSequenceShape(results)[0]
    }

    async buildSequenceByTowerId(id: Number) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE t4.id = ${id}`
        const results = await getConnection().query(queryExpression)
        const result = results.length !== 0 ? results[0] : null
        if (result === null) {
            return null
        }
        return convertToBuildSequenceShape(results)[0]
    }

    async buildSequenceByTowerName(name: String) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE t4.name = '${name}'`
        const results = await getConnection().query(queryExpression)
        const result = results.length !== 0 ? results[0] : null
        if (result === null) {
            return null
        }
        return convertToBuildSequenceShape(results)[0]
    }
}
