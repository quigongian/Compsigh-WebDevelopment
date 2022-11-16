import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../util/HttpStatus";

export function pingHandler(req: Request, res: Response, next: NextFunction) {
    res.status(HttpStatus.OK).send("pong");
}
