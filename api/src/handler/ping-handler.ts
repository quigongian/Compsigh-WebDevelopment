import { Request, Response, NextFunction } from "express";

export function pingHandler(req: Request, res: Response, next: NextFunction) {
    res.send("pong");
}
