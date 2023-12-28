import { type Router } from "express";
import { type Pool } from "pg";
import { UserRepository } from "./user.repository";
import { PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import type { IRouters, Module } from "../../types/router";

export class UserModule implements Module {
    readonly path: string = "/user"
    readonly isPrivate: boolean = true
    private readonly tableName: string = "user"
    private readonly userController: UserController
    constructor({ privateRouter, publicRouter }: IRouters, pool: Pool) {
        const router = this.isPrivate ? privateRouter : publicRouter
        this.userController = new UserController(router, new UserService(new UserRepository(new PoolWrapper(this.tableName, pool))))
    }

    getRouter(): Router {
        return this.userController.getRouter()
    }
}