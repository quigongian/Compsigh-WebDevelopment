import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../util/HttpStatus";

export function notFoundHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(HttpStatus.NOT_FOUND).json({ error: "URL not found" });
}
