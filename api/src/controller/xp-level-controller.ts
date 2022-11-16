import { Request, Response, NextFunction } from "express";
import { xpLevelService } from "../service/xp-level-service";
import { HttpStatus } from "../util/HttpStatus";

/**
 * @swagger
 *  /xplevel:
 *    get:
 *      tags:
 *        - xplevel
 *      summary: Get all xplevels
 *      produces:
 *        - "application/json"
 *      responses:
 *        200:
 *          description: Ok - Returns XpLevel[]
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/definitions/XpLevel"
 *        500:
 *          $ref: '#/definitions/InternalServerError'
 */
async function getAllXpLevels(req: Request, res: Response, next: NextFunction) {
    try {
        const xpLevels = await xpLevelService.getAll();
        res.status(HttpStatus.OK).json(xpLevels);
    } catch (error) {
        next(error);
    }
}

export const xpLevelController = {
    getAllXpLevels,
};
