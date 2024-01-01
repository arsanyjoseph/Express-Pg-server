import { type Router } from "express";
import { PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import type { Module } from "../../types/router";
import type { App } from "../../main";
import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";

export class CateogryModule implements Module {
    readonly path: string = "/category"
    private readonly tableName: string = "category"
    readonly isPrivate: boolean = true
    private readonly router: Router
    private readonly poolWrapper: PoolWrapper
    private readonly categoryRepository: CategoryRepository
    private readonly categoryService: CategoryService
    private readonly categoryController: CategoryController
    constructor(app: App) {
        this.router = this.isPrivate ? app.getRouters().privateRouter : app.getRouters().publicRouter
        this.poolWrapper = new PoolWrapper(this.tableName, app.getPool())
        this.categoryRepository = new CategoryRepository(this.poolWrapper)
        this.categoryService = new CategoryService(this.categoryRepository)
        this.categoryController = new CategoryController(this.router, this.categoryService, app.getValidator())
        app.registerRouter(this.path, this.getRouter())
    }

    private getRouter(): Router {
        return this.categoryController.getRouter()
    }
}