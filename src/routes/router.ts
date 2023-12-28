import { type RouterOptions, Router as ExpressRouter, type NextFunction, type Request, type Response } from "express";
export class Router {
    private readonly router: ExpressRouter
    constructor(options?: RouterOptions, middlewares?: Array<(req: Request, res: Response, next: NextFunction) => void>) {
        this.router = ExpressRouter(options)
        if (middlewares) {
            middlewares.forEach(middleware => { this.registerMiddleware(middleware) })
        }
    }

    registerMiddleware(middleware: (req: Request, res: Response, next: NextFunction) => void): void {
        this.router.use(middleware)
    }

    getRouter(): ExpressRouter {
        return this.router
    }
}