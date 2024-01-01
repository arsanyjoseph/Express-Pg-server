import { type Router } from "express";
import { UserRepository } from "./user.repository";
import { PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import type { Module } from "../../types/router";
import type { App } from "../../main";

export class UserModule implements Module {
    readonly path: string = "/user"
    private readonly tableName: string = "user"
    readonly isPrivate: boolean = true
    private readonly router: Router
    private readonly poolWrapper: PoolWrapper
    private readonly userRepository: UserRepository
    private readonly userService: UserService
    private readonly userController: UserController
    constructor(app: App) {
        this.router = this.isPrivate ? app.getRouters().privateRouter : app.getRouters().publicRouter
        this.poolWrapper = new PoolWrapper(this.tableName, app.getPool())
        this.userRepository = new UserRepository(this.poolWrapper)
        this.userService = new UserService(this.userRepository)
        this.userController = new UserController(this.router, this.userService)
        app.registerRouter(this.path, this.getRouter())
    }

    private getRouter(): Router {
        return this.userController.getRouter()
    }
}