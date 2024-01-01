import { type Router } from "express";

export interface IRouters {
  privateRouter: Router
  publicRouter: Router,
}
