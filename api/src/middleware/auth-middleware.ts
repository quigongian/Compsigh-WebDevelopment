import { Request, Response, NextFunction, RequestHandler } from "express";
import { jwtUtil } from "../util/jwt-util";
import { HttpStatus } from "../util/HttpStatus";
import { HttpError } from "../util/HttpError";

export function AUTH(handler: RequestHandler): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.header("authorization");
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
                    "invalid authorization header"
                );
            }
            const accessTokenPayload = await jwtUtil.verifyAccessToken(
                attrs[1]
            );
            req.userId = accessTokenPayload.userId;
            req.dateSigned = accessTokenPayload.dateSigned;
            handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}
