import type { Request, Response, NextFunction } from "express";
import { type IError } from "./errorHandler.middleware";
import { HttpErrorMessage, HttpErrorName, HttpStatusCode } from "../constants/http";

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
    const response: IError = {
        statusCode: HttpStatusCode.NOT_FOUND,
        message: HttpErrorMessage.NOT_FOUND.NO_ROUTE,
        name: HttpErrorName.NOT_FOUND
    }
    next(response)
}