import type { Column, ColumnValue, ICell } from "../../types/queries";

export const formatWhereCondition = (condition: Record<string, string | boolean | number>, offset: number = 0): {
    conditonString: string;
    values: Array<string | boolean | number>;
} => {
    const values: Array<string | boolean | number> = []
    const keys = Object.keys(condition)
    let conditonString = ""
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        values.push(condition[key])
        conditonString = `${conditonString} ${key} = $${i + 1 + offset}`
        if (i + 1 < keys.length) {
            conditonString = `${conditonString} AND`
        }
    }

    return { conditonString, values }
}

export const formatUpdatedColumns = (updatedColumns: Column, offset: number = 0): {
    values: ColumnValue[];
    formattedColumns: ICell[];
} => {
    const keys = Object.keys(updatedColumns)
    const values: ColumnValue[] = []
    const formattedColumns: ICell[] = []
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        values.push(updatedColumns[key])
        formattedColumns.push({ columnName: key, value: `$${i + 1 + offset}` })
    }
    return { values, formattedColumns }
}