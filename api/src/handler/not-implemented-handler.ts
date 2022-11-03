import { Request, Response, NextFunction } from "express";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

export function notImplementedHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, "Not implemented");
}
