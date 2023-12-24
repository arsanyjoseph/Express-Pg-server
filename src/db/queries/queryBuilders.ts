export const SelectQueryBuilder = (columnName: string = "*", tableName: string, condition?: string): string => {
    const baseQuery = `SELECT ${columnName} from public.${tableName}`
    return condition ? `${baseQuery} WHERE ${condition}` : baseQuery
}

export const UpdateQueryBuilder = (tableName: string, columnName: string, value: number | string | boolean | null, condition?: string): string => {
    const baseQuery = `UPDATE public.${tableName} SET ${columnName} = ${value}`
    return condition ? `${baseQuery} WHERE ${condition}` : baseQuery
}

export const InsertQueryBuilder = (tableName: string, columns: string[], values: string[], returnColumns?: string[]): string => {
    const baseQuery = `INSERT INTO public.${tableName}`
    const columnsString = `(${columns.join(", ")})`
    const valuesString = `(${values.join(", ")})`
    const returning = returnColumns?.join(", ")
    return `${baseQuery} ${columnsString} VALUES ${valuesString} ${returning}`;
}