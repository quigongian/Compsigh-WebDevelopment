import { NextFunction, Request, Response } from "express";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

export function defaultErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Internal server error",
        });
    }
}
