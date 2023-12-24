import { type NextFunction, type Request, type Response } from "express";
import { extractTokenFromHeaders, verifyToken } from "../utils/jwt";
import { type IError } from "./errorHandler.middleware";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
        const token = extractTokenFromHeaders(req)
        const user = verifyToken(token, process.env.JWT_SECRET)
        if (!user) throw new Error("Error while Authentication")
    } catch (errorMessage) {
        const error: IError = {
            message: errorMessage as string,
            name: "UnAuthorized",
            statusCode: 401
        }
        next(error)
    }
}