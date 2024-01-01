import { type Router } from "express";
import { PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import type { Module } from "../../types/router";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { UserRepository } from "../user/user.repository";
import type { App } from "../../main";

export class AuthModule implements Module {
    readonly path: string = "/auth"
    private readonly tableName: string = "user"
    readonly isPrivate: boolean = false
    private readonly router: Router
    private readonly poolWrapper: PoolWrapper
    private readonly authRepository: AuthRepository
    private readonly authService: AuthService
    private readonly authController: AuthController
    constructor(app: App) {
        this.router = this.isPrivate ? app.getRouters().privateRouter : app.getRouters().publicRouter
        this.poolWrapper = new PoolWrapper(this.tableName, app.getPool())
        this.authRepository = new AuthRepository(new UserRepository(this.poolWrapper))
        this.authService = new AuthService(this.authRepository)
        this.authController = new AuthController(this.router, this.authService, app.getValidator())
        app.registerRouter(this.path, this.getRouter())
    }

    private getRouter(): Router {
        return this.authController.getRouter()
    }
}