import type { Pool } from "pg";
import { type Router, type Express, } from "express";
import { type DBConnection } from "./db/db";
import type { Module, IRouters } from "./types/router";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import { notFoundHandler } from "./middlewares/404Handler.middleware";
import type { ValidatorMiddleware } from "./middlewares/validator.middleware";

export class App {
  private readonly modules: Module[]
  constructor(
    private readonly app: Express,
    private readonly routers: IRouters,
    middlewares: any[] = [],
    private readonly db: DBConnection,
    registerModules: (app: App) => Module[],
    private readonly validator:ValidatorMiddleware
  ) {
    db.connect();
    this.registerMiddleware(middlewares)
    this.modules = registerModules(this)
    this.registerMiddleware(notFoundHandler)
    this.registerMiddleware(errorHandlerMiddleware)
  }

  registerRouter(routePath: string, router: Router, middleware?: () => void): void {
    if (middleware !== undefined) {
      this.app.use(routePath, middleware, router);
    } else {
      this.app.use(routePath, router);
    }
  }

  getValidator():ValidatorMiddleware {
    return this.validator
  }

  private registerMiddleware(middleware: any): void {
    this.app.use(middleware);
  }

  public getRouters(): IRouters {
    return this.routers
  }

  public getPool(): Pool {
    return this.db.pool
  }

  public listen(port?: string): void {
    this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}
