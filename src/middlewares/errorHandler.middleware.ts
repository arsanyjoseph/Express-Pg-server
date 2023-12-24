import { type Request, type Response, type NextFunction } from "express"

export interface IError extends Error {
    statusCode?: number
}

const errorHandlerMiddleware = (err: IError, req: Request, res: Response, next: NextFunction): void => {
    const errStatus: number = err.statusCode ?? 500;
    const errMsg = err.message ?? 'Something went wrong';
    res.setHeader('Content-Type', 'application/json');
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default errorHandlerMiddleware