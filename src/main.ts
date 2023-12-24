import { type Express, type Router } from "express";
import { type DBConnection } from "./modules/db/db";
import { type IRoutes } from "./types/router";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";

export class App {
  constructor(
    private readonly app: Express,
    privateRouter: Router,
    publicRouter: Router,
    middlewares: any[] = [],
    routes: IRoutes[],
    db: DBConnection
  ) {
    this.registerMiddleware(middlewares)
    routes.forEach((route) => {
      route.private ?
        this.registerRouter(route.path, route.router(privateRouter, db.pool), route.middleware) :
        this.registerRouter(route.path, route.router(publicRouter, db.pool), route.middleware)
    });
    db.connect();
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
