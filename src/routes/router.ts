import { type RouterOptions, Router as ExpressRouter, type NextFunction, type Request, type Response } from "express";
export class Router {
    private readonly router: ExpressRouter
    constructor(options?: RouterOptions) {
        this.router = ExpressRouter(options)
    }

    registerMiddleware(middleware: (req: Request, res: Response, next: NextFunction) => any): void {
        this.router.use(middleware)
    }

    getRouter(): ExpressRouter {
        return this.router
    }
}