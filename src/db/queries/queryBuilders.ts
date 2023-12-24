interface ICell {
    columnName: string
    value: string
}

export interface ISelect {
    columnName: string
    tableName: string
    condition?: string
}

export interface IInsert {
    tableName: string
    insertedColumns: ICell[]
    returnColumns?: string[]
}
export interface IUpdate {
    tableName: string
    updatedColumns: ICell[]
    condition?: string
    returnColumns?: string[]
}

export const SelectQueryBuilder = ({ columnName, tableName, condition }: ISelect): string => {
    const baseQuery = `SELECT ${columnName} from public.${tableName}`
    return condition ? `${baseQuery} WHERE ${condition}` : baseQuery
}

export const UpdateQueryBuilder = ({ tableName, updatedColumns, condition, returnColumns }: IUpdate): string => {
    const baseQuery = `UPDATE public.${tableName}`
    const update = updatedColumns.map(({ columnName, value }) => `"${columnName}" = ${value}`).join(", ")
    const returning = returnColumns?.join(", ")
    return `${baseQuery} SET ${update} ${condition ? 'WHERE ' + condition : ""} RETURNING ${returning}`
}

export const InsertQueryBuilder = ({ tableName, returnColumns, insertedColumns }: IInsert): string => {
    const baseQuery = `INSERT INTO public.${tableName}`
    const columnsString = `(${insertedColumns.map(column => `"${column.columnName}"`).join(", ")})`
    const valuesString = `(${insertedColumns.map(column => column.value).join(", ")})`
    const returning = returnColumns?.join(", ")
    return `${baseQuery} ${columnsString} VALUES ${valuesString} RETURNING ${returning}`;
}