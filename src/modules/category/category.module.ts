import { type Router } from "express";
import { PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import type { App } from "../../main";
import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { Module } from "../common/module";

export class CateogryModule extends Module {
    private readonly categoryRepository: CategoryRepository
    private readonly categoryService: CategoryService
    private readonly categoryController: CategoryController
    constructor(app: App) {
        super("/category", "category", true, app)
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