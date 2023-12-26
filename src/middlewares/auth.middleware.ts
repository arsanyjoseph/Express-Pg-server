import { type NextFunction, type Response } from "express";
import { extractTokenFromHeaders, verifyToken } from "../utils/jwt";
import { type IError } from "./errorHandler.middleware";
import { type CustomRequest } from "../types/request";
import { type IJwtPayload } from "../types/jwt";
import { HttpErrorMessage, HttpErrorName, HttpStatusCode } from "../constants/httpResponse";

export function authMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
    try {
        const token = extractTokenFromHeaders(req)
        if (!token) throw new Error(HttpErrorMessage.UNAUTHORIZED.NO_TOKEN)
        const user = verifyToken(token, process.env.JWT_SECRET)
        if (!token) throw new Error(HttpErrorMessage.UNAUTHORIZED.NO_TOKEN)
        req.user = user as IJwtPayload
        next()
    } catch (err) {
        const error: IError = {
            message: (err as Error).message,
            name: HttpErrorName.UNAUTHORIZED,
            statusCode: HttpStatusCode.UNAUTHORIZED
        }
        next(error)
    }
}