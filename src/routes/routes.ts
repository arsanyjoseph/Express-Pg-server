import { type Router } from "express";
import { type Pool } from "pg";
import { AuthController } from "../modules/auth/auth.controller";
import { AuthService } from "../modules/auth/auth.service";
import { AuthRepository } from "../modules/auth/auth.repository";
import { UserController } from "../modules/user/user.controller";
import { UserService } from "../modules/user/user.service";
import { UserRepository } from "../modules/user/user.repository";
import { type IRoutes } from "../types/router";

export const routes: IRoutes[] = [
  {
    path: "/auth",
    private: false,
    router: (router: Router, pool: Pool) =>
      new AuthController(
        router,
        new AuthService(new AuthRepository(pool, new UserRepository(pool)))
      ).getRouter()
  },
  {
    path: "/user",
    private: true,
    router: (router: Router, pool: Pool) =>
      new UserController(
        router,
        new UserService(new UserRepository(pool)),
      ).getRouter()
  }
];
