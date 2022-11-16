import { Request, Response, NextFunction, RequestHandler } from "express";
import { jwtUtil } from "../util/jwt-util";
import { HttpStatus } from "../util/HttpStatus";

export function AUTH(handler: RequestHandler): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction) {
        const authHeader = req.header("authorization");
        if (!authHeader) {
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: "Authorization header not defined",
            });
            return;
        }
        const attrs = authHeader.split(" ");
        if (attrs.length !== 2 || attrs[0] !== "Bearer" || !attrs[1]) {
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: "invalid authorization header",
            });
            return;
        }
        const accessTokenPayload = await jwtUtil.verifyAccessToken(attrs[1]);
        req.userId = accessTokenPayload.userId;
        req.dateSigned = accessTokenPayload.dateSigned;
        handler(req, res, next);
    };
}
