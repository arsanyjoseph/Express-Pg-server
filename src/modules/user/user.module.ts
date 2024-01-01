import { type Router } from "express";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import type { App } from "../../main";
import { Module } from "../common/module";

export class UserModule extends Module {
    private readonly userRepository: UserRepository
    private readonly userService: UserService
    private readonly userController: UserController
    constructor(app: App) {
        super("/user", "user", true, app)
        this.userRepository = new UserRepository(this.poolWrapper)
        this.userService = new UserService(this.userRepository)
        this.userController = new UserController(this.router, this.userService, app.getValidator())
        app.registerRouter(this.path, this.getRouter())
    }

    private getRouter(): Router {
        return this.userController.getRouter()
    }
}