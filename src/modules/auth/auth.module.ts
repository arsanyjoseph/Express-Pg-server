import { type Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { UserRepository } from "../user/user.repository";
import type { App } from "../../main";
import { Module } from "../common/module";

export class AuthModule extends Module {
    private readonly authRepository: AuthRepository
    private readonly authService: AuthService
    private readonly authController: AuthController
    constructor(app: App) {
        super("/auth", "user", false, app)
        this.authRepository = new AuthRepository(this.poolWrapper, new UserRepository(this.poolWrapper))
        this.authService = new AuthService(this.authRepository)
        this.authController = new AuthController(this.router, this.authService, app.getValidator())
        app.registerRouter(this.path, this.getRouter())
    }

    private getRouter(): Router {
        return this.authController.getRouter()
    }
}