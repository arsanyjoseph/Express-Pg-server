import type { Pool } from "pg";
import { type Router, type Express, } from "express";
import { type DBConnection } from "./db/db";
import type { Module, IRouters } from "./types/router";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import { notFoundHandler } from "./middlewares/404Handler.middleware";

export class App {
  constructor(
    private readonly app: Express,
    routers: IRouters,
    middlewares: any[] = [],
    db: DBConnection,
    registerModules: (routers: IRouters, pool: Pool) => Module[]
  ) {
    db.connect();
    this.registerMiddleware(middlewares)
    const modules = registerModules(routers, db.pool)
    modules.forEach(module => { this.registerRouter(module.path, module.getRouter()) })

    this.registerMiddleware(notFoundHandler)
    this.registerMiddleware(errorHandlerMiddleware)
  }

  private registerRouter(routePath: string, router: Router, middleware?: () => void): void {
    if (middleware !== undefined) {
      this.app.use(routePath, middleware, router);
    } else {
      this.app.use(routePath, router);
    }
  }

  private registerMiddleware(middleware: any): void {
    this.app.use(middleware);
  }

  public listen(port?: string): void {
    this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}
