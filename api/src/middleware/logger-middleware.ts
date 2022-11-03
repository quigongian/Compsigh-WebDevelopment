import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(
        `${new Date().toLocaleString()} ${
            req.method + " ".repeat(7 - req.method.length)
        } /api${req.path} ${req.ip}`
    );
    next();
}
