import { AbilityArgs } from "../definitions/argsAbility"
import { getConnection } from "typeorm"
import { buildFilterExpression, buildSortExpression } from "./utils"
import { TABLE_EXPRESSION } from "./utilsAbilityTableExpr"

const DB_NAME = process.env.NODE_ENV === "test" ? "test" : "default"

const nothingLeft = (arrays: any[]): boolean => {
    return arrays.some(list => list.length === 0)
}

export class AbilityService {
    async abilities(args: AbilityArgs) {
        const { onlyKingdoms, onlyTowerTypes, take, skip, sortDefinition } = args

        if (nothingLeft([onlyKingdoms, onlyTowerTypes, sortDefinition])) {
            return []
        }

        const kingdoms = buildFilterExpression(onlyKingdoms, `t4.kingdom`)
        const towerTypes = buildFilterExpression(onlyTowerTypes, `t4."towerType"`)
        const pageExpr = `LIMIT ${take} OFFSET ${skip}`
        const sortColumns = buildSortExpression(sortDefinition)
        const sortExpr = `ORDER BY ${sortColumns}`
        const filterExpr = `WHERE (${kingdoms}) AND (${towerTypes})`
        const query = `${TABLE_EXPRESSION} ${filterExpr} ${sortExpr} ${pageExpr}`
        //console.log(query)
        return await getConnection(DB_NAME).query(query)
    }

    async abilitiesByTowerId(id: Number) {
        const query = `${TABLE_EXPRESSION} WHERE t4.id = ${id} ORDER BY ability_table."abilityId" ASC`
        return await getConnection(DB_NAME).query(query)
    }

    async abilitiesByTowerName(name: String) {
        const query = `${TABLE_EXPRESSION} WHERE t4.name = '${name}'`
        return await getConnection(DB_NAME).query(query)
    }

    async abilityById(id: Number) {
        const query = `${TABLE_EXPRESSION} WHERE ability_table."abilityId" = '${id}'`
        const results = await getConnection(DB_NAME).query(query)
        return results.length !== 0 ? results[0] : null
    }

    async abilityByName(name: String) {
        const query = `${TABLE_EXPRESSION} WHERE ability_table."abilityName" = '${name}'`
        const results = await getConnection(DB_NAME).query(query)
        return results.length !== 0 ? results[0] : null
    }
}
