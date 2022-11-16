import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../util/HttpStatus";

/**
 * @swagger
 *  /ping:
 *    get:
 *      tags:
 *        - healthcheck
 *      summary: Ping the server
 *      produces:
 *        - text/plain
 *      responses:
 *        200:
 *          description: Ok - Server is up and running
 *          schema:
 *            type: string
 *            example: pong
 *        500:
 *          $ref: '#/definitions/InternalServerError'
 */
export function pingHandler(req: Request, res: Response, next: NextFunction) {
    res.status(HttpStatus.OK).send("pong");
}

export interface Error {
    error: string;
}
