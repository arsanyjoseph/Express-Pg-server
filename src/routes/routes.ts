import { type Pool } from "pg";
import type { IRouters, Module, } from "../types/router";
import { AuthModule } from "../modules/auth/auth.module";
import { UserModule } from "../modules/user/user.module";


export const registerModules = (routers: IRouters, pool: Pool): Module[] => [new AuthModule(routers, pool), new UserModule(routers, pool)]

