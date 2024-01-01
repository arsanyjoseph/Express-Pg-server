import { type Router as ERouter } from "express";
import { PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import { type App } from "../../main";
import { Router } from "../../router/router";
import { authMiddleware } from "../../middlewares/auth.middleware";

export abstract class Module {
    router: ERouter
    poolWrapper: PoolWrapper
    constructor(readonly path: string, readonly tableName: string, readonly isPrivate: boolean, app: App) {
        this.poolWrapper = new PoolWrapper(this.tableName, app.getPool())
        this.router = this.createRouter()
        app.registerRouter(path, this.router)
    }

    private createRouter(): ERouter {
        const router = new Router()
        if (this.isPrivate) {
            router.registerMiddleware(authMiddleware)
        }
        return router.getRouter()
    }
}