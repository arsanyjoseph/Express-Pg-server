import type { NextFunction, Request, Response } from "express";
import { logToFile } from "../utils/writeLogFile";

export function customLogger(req: Request, res: Response, next: NextFunction): void {
    const date = new Date()
    const logEntry = `${date.toDateString()}: ${date.toTimeString()} ::${req.method}:${req.hostname}${req.url} \n`
    process.env.NODE_ENV === "production" ? logToFile(logEntry, "./") : console.log(logEntry);
    next()
}