import { type Router } from "express";
import { type ValidatorMiddleware } from "../../middlewares/validator.middleware";

export abstract class Controller {
    constructor(readonly router: Router,
        readonly validator: ValidatorMiddleware
    ) { }

    registerRoutes(): void {
        throw new Error("This method should be implemented by subclass")
    }

    getRouter(): Router {
        return this.router
    }
}