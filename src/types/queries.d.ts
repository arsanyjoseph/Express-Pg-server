export type ColumnValue = string | number | boolean | null
export type Column = Record<string, ColumnValue>

export interface ICell {
    columnName: string
    value: string
}

export interface ISelect {
    columns: string | string[]
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