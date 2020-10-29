import { BuildSequenceArgs } from "../definitions/argsBuildSequence"
import { getConnection } from "typeorm"
import { buildFilterExpression, buildSortExpression } from "./utils"
import { convertToBuildSequenceShape } from "./utilsBuildSequence"
import { TABLE_EXPRESSION } from "./utilsBuildSequenceTableExpr"

const findOneBuildSequence = async (queryExpression: string) => {
    const results = await getConnection().query(queryExpression)
    const result = results.length !== 0 ? results[0] : null
    if (result === null) {
        return null
    }
    return convertToBuildSequenceShape(results)[0]
}

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
        return findOneBuildSequence(queryExpression)
    }

    async buildSequenceByTowerId(id: Number) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE t4.id = ${id}`
        return findOneBuildSequence(queryExpression)
    }

    async buildSequenceByTowerName(name: String) {
        const queryExpression = `${TABLE_EXPRESSION} WHERE t4.name = '${name}'`
        return findOneBuildSequence(queryExpression)
    }
}
