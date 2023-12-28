import { type Router } from "express";
import { type Pool } from "pg";

export interface IRouter {
  getRouter: () => Router;
}

export interface IRoutes {
  path: string;
  private: boolean;
  router: (router: Router, pool: Pool) => Router;
  middleware?: () => any;
}

export interface IRouterOptions {
  privateRouter: Router
  publicRouter: Router,
  routes: IRoutes[]
}
