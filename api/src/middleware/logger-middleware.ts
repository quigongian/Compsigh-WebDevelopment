import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const date = new Date();
    console.log(
        date.toLocaleString(),
        req.method,
        req.method.padEnd(7, " "),
        req.originalUrl
    );
    res.on("finish", () => {
        console.log(
            new Date().toLocaleString(),
            req.method,
            req.method.padEnd(7, " "),
            req.originalUrl,
            "->",
            res.statusCode,
            res.statusMessage,
            `${new Date().getTime() - date.getTime()}ms`
        );
    });
    next();
}
