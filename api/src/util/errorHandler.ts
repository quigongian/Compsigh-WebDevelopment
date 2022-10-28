import e, { NextFunction, Request, Response } from "express";
import HttpError from "./httpError";
import HttpStatus from "./httpStatus";

function errorHandler(
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
        res.status(err.status).json({ error: err.message });
    } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err.message || "Internal server error",
        });
    }
}

export default errorHandler;
