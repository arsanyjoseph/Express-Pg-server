import { type Router } from "express";

export interface IRouter {
  getRouter: () => Router;
}

export interface Module extends IRouter {
  path: string
  isPrivate: boolean
}

export interface IRouters {
  privateRouter: Router
  publicRouter: Router,
}
