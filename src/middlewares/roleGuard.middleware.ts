import type { Response, NextFunction } from "express";
import { type IError } from "./errorHandler.middleware";
import { HttpErrorMessage, HttpErrorName, HttpStatusCode } from "../constants/httpResponse";
import { type UserRoles } from "../types/userRoles";
import { type CustomRequest } from "../types/request";

export function roleGuardMiddleware(req: CustomRequest, res: Response, next: NextFunction, role: UserRoles): void {
    const { user } = req
    if (user && user.role === role) {
        next()
    } else {
        const error: IError = {
            statusCode: HttpStatusCode.FORBIDDEN,
            message: HttpErrorMessage.FORBIDDEN.ACCESS_DENIED,
            name: HttpErrorName.FORBIDDEN
        }
        next(error)
    }
}