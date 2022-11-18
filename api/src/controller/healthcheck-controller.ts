import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../util/HttpStatus";

/**
 * @swagger
 *  /ping:
 *    get:
 *      tags:
 *        - healthcheck
 *      summary: Ping the server
 *      responses:
 *        200:
 *          description: Ok - Server is up and running
 *          schema:
 *            $ref: "#/definitions/PingResponse"
 *        500:
 *          $ref: '#/definitions/InternalServerError'
 */
function ping(req: Request, res: Response, next: NextFunction) {
    res.status(HttpStatus.Ok).send({ message: "pong" });
}

export const healthCheckController = {
    ping,
};
