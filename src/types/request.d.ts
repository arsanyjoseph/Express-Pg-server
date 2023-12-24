import { type Request } from "express"
import { type IJwtPayload } from "./jwt"
export interface CustomRequest extends Request {
    user?: IJwtPayload
}