import { NextFunction, Request, Response } from "express";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

export function notFoundHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    throw new HttpError(HttpStatus.NOT_FOUND, "URL Not found");
}
