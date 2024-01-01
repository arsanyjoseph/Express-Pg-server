import { type Router } from "express";
import { PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import { type App } from "../../main";

export abstract class Module {
    router: Router
    poolWrapper: PoolWrapper
    constructor(readonly path: string, readonly tableName: string, readonly isPrivate: boolean, app: App) {
        this.router = this.isPrivate ? app.getRouters().privateRouter : app.getRouters().publicRouter
        this.poolWrapper = new PoolWrapper(this.tableName, app.getPool())
    }
}