import { NextFunction, Request, Response } from "express";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

export function globalErrorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("--------------------------------");
    console.error(error.stack);
    console.log("--------------------------------");
    if (res.headersSent) {
        return next(error);
    }
    if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
    } else {
        res.status(HttpStatus.InternalServerError).json({
            error: "Internal server error",
        });
    }
}
