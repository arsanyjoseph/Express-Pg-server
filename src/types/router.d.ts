import { type Router } from "express";
import { type Pool } from "pg";

export interface IRouter {
  getRouter: () => Router;
}

export interface IRoutes {
  path: string;
  router: (router: Router, pool: Pool) => Router;
}
