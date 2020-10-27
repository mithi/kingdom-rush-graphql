import {
    AllowedSortDefinitionElement,
    FilterableEnums,
    BuildQueryArgs,
} from "../enums/definitions"

export const buildSortExpression = (sortDefinition: AllowedSortDefinitionElement[]) =>
    sortDefinition.map(sortRow => `${sortRow.column} ${sortRow.sortOrder}`).join(", ")

export const buildFilterExpression = (enums: FilterableEnums[], column: string): string =>
    Array.from(new Set(enums))
        .map(e => `${column} = '${e}'`)
        .join(" OR ")

const buildQueryExpression = (
    {
        skip,
        take,
        onlyLevels,
        onlyKingdoms,
        onlyTowerTypes,
        sortDefinition,
    }: BuildQueryArgs,
    tableExpr: string
): string => {
    const levels = buildFilterExpression(onlyLevels, `level`)
    const kingdoms = buildFilterExpression(onlyKingdoms, `kingdom`)
    const towerTypes = buildFilterExpression(onlyTowerTypes, `"towerType"`)
    // TODO: Add check to make sure all elements of the array sortDefinition have unique columns
    const sortColumns = buildSortExpression(sortDefinition)

    const filterExpr = `WHERE (${levels}) AND (${kingdoms}) AND (${towerTypes})`
    const sortExpr = `ORDER BY ${sortColumns}`
    const pageExpr = `LIMIT ${take} OFFSET ${skip}`
    const queryExpression = `SELECT * FROM ${tableExpr} ${filterExpr} ${sortExpr} ${pageExpr}`
    console.log(queryExpression)
    return queryExpression
}

const nothingLeft = (args: BuildQueryArgs): boolean => {
    const { onlyLevels, onlyTowerTypes, onlyKingdoms } = args
    // We have filtered out all options that we know the query won't result anything
    return [onlyLevels, onlyTowerTypes, onlyKingdoms].every(list => list.length === 0)
}

export { nothingLeft, buildQueryExpression }
