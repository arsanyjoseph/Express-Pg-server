import { type Express, type Router } from "express";
import { type DBConnection } from "./modules/db/db";
import { type IRoutes } from "./types/router";

export class App {
  constructor(
    private readonly app: Express,
    router: Router,
    middlewares: any[] = [],
    routes: IRoutes[],
    db: DBConnection
  ) {
    middlewares.forEach((middleware) => {
      this.registerMiddleware(middleware);
    });
    routes.forEach((route) => {
      this.registerRouter(route.path, route.router(router, db.pool));
    });
    db.connect();
  }

  private registerRouter(routePath: string, router: Router): void {
    this.app.use(routePath, router);
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
