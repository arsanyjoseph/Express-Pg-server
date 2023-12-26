import type { ISelect, IInsert, IUpdate } from "../../types/queries"

export const SelectQueryBuilder = ({ columns, tableName, condition }: ISelect): string => {
    const columnsToString = typeof columns === "string" ? columns : columns.map((column) => `"${column}"`).join(", ")
    const baseQuery = `SELECT ${columnsToString} from public.${tableName}`
    return condition ? `${baseQuery} WHERE ${condition}` : baseQuery
}

export const UpdateQueryBuilder = ({ tableName, updatedColumns, condition, returnColumns }: IUpdate): string => {
    const baseQuery = `UPDATE public.${tableName}`
    const update = updatedColumns.map(({ columnName, value }) => `"${columnName}" = ${value}`).join(", ")
    const returning = returnColumns?.join(", ")
    return `${baseQuery} SET ${update} ${condition ? 'WHERE ' + condition : ""} RETURNING ${returning}`
}

export const InsertQueryBuilder = ({ tableName, insertedColumns, returnColumns }: IInsert): string => {
    const baseQuery = `INSERT INTO public.${tableName}`
    const columnsString = `(${insertedColumns.map(column => `"${column.columnName}"`).join(", ")})`
    const valuesString = `(${insertedColumns.map(column => column.value).join(", ")})`
    const returning = returnColumns?.join(", ")
    return `${baseQuery} ${columnsString} VALUES ${valuesString} RETURNING ${returning}`;
}