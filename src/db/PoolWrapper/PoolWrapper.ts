import { formatUpdatedColumns, formatWhereCondition } from './../queries/queryHelpers';
import { type QueryResult, type Pool, type QueryResultRow } from "pg";
import { SelectQueryBuilder, UpdateQueryBuilder, InsertQueryBuilder } from "../queries/queryBuilders";
import type { Column, ColumnValue, IInsert, ISelect, IUpdate } from '../../types/queries';

export class PoolWrapper {
    constructor(private readonly tableName: string, private readonly pool: Pool) {
    }

    async query<T extends QueryResultRow>(query: {
        text: string;
        values: ColumnValue[];
    }): Promise<QueryResult<T>> {
        try {
            return await this.pool.query<T>(query)
        } catch (error) {
            throw new Error(error as string)
        }
    }

    private async find<T extends QueryResultRow>(columns: string | string[], condition: Record<string, string | number | boolean>): Promise<T[]> {
        const { conditonString, values } = formatWhereCondition(condition)
        const queryParams: ISelect = { columns, tableName: this.tableName, condition: conditonString }
        const query = {
            text: SelectQueryBuilder(queryParams),
            values
        };
        const records = (await this.query<T>(query)).rows;
        return records
    }

    async findOne<T extends QueryResultRow>(columns: string | string[], condition: Record<string, string | number | boolean>): Promise<T> {
        const records = await this.find<T>(columns, condition)
        return records[0]
    }

    async findAll<T extends QueryResultRow>(columns: string | string[], condition: Record<string, string | number | boolean>): Promise<T[]> {
        const records = await this.find<T>(columns, condition)
        return records
    }

    async updateEntity<T extends QueryResultRow>(updatedColumns: Column, condition: Record<string, string | number | boolean>): Promise<T[]> {
        const { formattedColumns, values: columnValues } = formatUpdatedColumns(updatedColumns)
        const { conditonString, values: conditionValues } = formatWhereCondition(condition, columnValues.length)
        const queryParams: IUpdate = {
            tableName: this.tableName,
            updatedColumns: formattedColumns,
            condition: conditonString,
            returnColumns: ["*"]
        }
        const query = {
            text: UpdateQueryBuilder(queryParams),
            values: [...columnValues, ...conditionValues]
        };
        const records = (await this.query<T>(query)).rows
        return records
    }

    async create<T extends QueryResultRow>(createdColumns: T): Promise<T[]> {
        const { formattedColumns, values: columnValues } = formatUpdatedColumns(createdColumns)

        const queryParams: IInsert = {
            tableName: this.tableName,
            insertedColumns: formattedColumns,
            returnColumns: ["*"]
        }
        const query = {
            text: InsertQueryBuilder(queryParams),
            values: [...columnValues]
        };

        const records = (await this.query<T>(query)).rows
        return records

    }
}