import { type PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";

export abstract class Repository {
    constructor(readonly poolWrapper: PoolWrapper) { }
}