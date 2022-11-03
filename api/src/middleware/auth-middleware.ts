import { Request, Response, NextFunction, RequestHandler } from "express";
import { jwtUtil } from "../util/jwt-util";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

export function AUTH(handler: RequestHandler): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "Authorization header not defined"
            );
        }
        const attrs = authHeader.split(" ");
        if (attrs.length !== 2 || attrs[0] !== "Bearer" || !attrs[1]) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "Invalid authorization header"
            );
        }
        const accessTokenPayload = jwtUtil.verifyAccessToken(attrs[1]);
        req.userId = accessTokenPayload.userId;
        req.dateSigned = accessTokenPayload.dateSigned;
        handler(req, res, next);
    };
}
