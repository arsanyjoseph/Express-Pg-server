import { type Router } from "express";
import { type Pool } from "pg";
import { PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import type { IRouters, Module } from "../../types/router";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { UserRepository } from "../user/user.repository";
import { ValidatorMiddleware } from "../../middlewares/validator.middleware";

export class AuthModule implements Module {
    readonly path: string = "/auth"
    private readonly tableName: string = "user"
    readonly isPrivate: boolean = false
    readonly authController: AuthController
    constructor({ privateRouter, publicRouter }: IRouters, pool: Pool) {
        const router = this.isPrivate ? privateRouter : publicRouter
        this.authController = new AuthController(router,
            new AuthService(
                new AuthRepository
                    (new UserRepository(
                        new PoolWrapper(this.tableName, pool)))),
            new ValidatorMiddleware())
    }

    getRouter(): Router {
        return this.authController.getRouter()
    }
}