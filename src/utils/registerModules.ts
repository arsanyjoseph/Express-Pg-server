import { AuthModule } from "../modules/auth/auth.module";
import { UserModule } from "../modules/user/user.module";
import type { App } from "../main";
import { CateogryModule } from "../modules/category/category.module";
import { type Module } from "../modules/common/module";


export const registerModules = (app: App): Module[] => [new AuthModule(app), new UserModule(app), new CateogryModule(app)]

