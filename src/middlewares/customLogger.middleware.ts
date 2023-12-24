import type { NextFunction, Request, Response } from "express";

export function customLogger(req: Request, res: Response, next: NextFunction): void {
    const date = new Date()
    console.log(`${date.toDateString()}: ${date.toTimeString()} ::${req.method}:${req.hostname}${req.url}`);
    next()
}