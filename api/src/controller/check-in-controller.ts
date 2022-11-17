import { Request, Response, NextFunction } from "express";
import { checkInService } from "../service/check-in-service";
import { userService } from "../service/user-service";
import { HttpStatus } from "../util/HttpStatus";

/**
 * @swagger
 *  /checkin:
 *    get:
 *      tags:
 *        - checkin
 *      summary: Get paginated checkIns
 *      produces:
 *        - "application/json"
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: query
 *          name: page
 *          type: integer
 *          required: false
 *          description: Page number (starting at 1), if not specified, ALL checkIns will be returned
 *          default: 1
 *        - in: query
 *          name: size
 *          type: integer
 *          required: false
 *          description: Page size, defaults to 31
 *          default: 31
 *      responses:
 *        200:
 *          description: Ok - Returns CheckInDTO[]
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/definitions/CheckInDTO"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function getPaginatedCheckIns(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const checkInDTOs = await checkInService.getPaginatedCheckInDTOs({
            userId: req.userId,
            page: req.query.page as string | null,
            size: req.query.size as string | null,
        });
        res.status(HttpStatus.Ok).json(checkInDTOs);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /checkin:
 *    post:
 *      tags:
 *        - checkin
 *      summary: Create checkIn
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: CreateCheckInRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/CreateCheckInRequest"
 *      responses:
 *        201:
 *          description: Created - Returns CheckInDTO
 *          schema:
 *            $ref: "#/definitions/CheckInDTO"
 *        400:
 *          $ref: "#/definitions/BadRequest"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function makeCheckIn(req: Request, res: Response, next: NextFunction) {
    try {
        const checkIn = await checkInService.createAndReturnCheckInDTO({
            userId: req.userId,
            answer2: req.body.answer2,
            answer3: req.body.answer3,
            answer4: req.body.answer4,
            comments: req.body.comments,
            checkInStatus: req.body.checkInStatus,
        });
        await userService.updateLastCheckIn(req.userId);
        res.status(HttpStatus.Created).json(checkIn);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /checkin/{checkInId}:
 *    get:
 *      tags:
 *        - checkin
 *      summary: Get checkIn by id
 *      produces:
 *        - "application/json"
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: path
 *          name: checkInId
 *          description: checkInId
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Ok - Returns CheckInDTO
 *          schema:
 *            $ref: "#/definitions/CheckInDTO"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function getCheckIn(req: Request, res: Response, next: NextFunction) {
    try {
        const checkInDTO = await checkInService.getCheckInDTOById(
            req.params.checkInId
        );
        res.status(HttpStatus.Ok).json(checkInDTO);
    } catch (error) {
        next(error);
    }
}

export const checkInController = {
    getPaginatedCheckIns,
    makeCheckIn,
    getCheckIn,
};
