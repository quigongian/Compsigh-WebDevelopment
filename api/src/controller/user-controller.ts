import { Request, Response, NextFunction } from "express";
import { userService } from "../service/user-service";
import { HttpStatus } from "../util/HttpStatus";

/**
 * @swagger
 *  /user:
 *    get:
 *      tags:
 *        - user
 *      summary: Get current user
 *      produces:
 *        - "application/json"
 *      security:
 *        - JWT: []
 *      responses:
 *        200:
 *          description: Ok - Returns UserDTO
 *          schema:
 *            $ref: "#/definitions/UserDTO"
 *        400:
 *          $ref: "#/definitions/BadRequest"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userDTO = await userService.getUserDTOById(req.userId);
        res.status(HttpStatus.Ok).json(userDTO);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /user:
 *    delete:
 *      tags:
 *        - user
 *      summary: Delete current user account
 *      produces:
 *        - "application/json"
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: DeleteUserRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/DeleteUserRequest"
 *      responses:
 *        204:
 *          $ref: "#/definitions/NoContent"
 *        400:
 *          $ref: "#/definitions/BadRequest"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
        await userService.deleteUser(req.userId, req.body.userName);
        res.sendStatus(HttpStatus.NoContent);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /user/password:
 *    patch:
 *      tags:
 *        - user
 *      summary: Change current user password
 *      produces:
 *        - "application/json"
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: ChangePasswordRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/ChangePasswordRequest"
 *      responses:
 *        204:
 *          $ref: "#/definitions/NoContent"
 *        400:
 *          $ref: "#/definitions/BadRequest"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function changePassword(req: Request, res: Response, next: NextFunction) {
    try {
        await userService.changePassword(
            req.userId,
            req.body.oldPassword,
            req.body.newPassword,
            req.body.repeatPassword
        );
        res.sendStatus(HttpStatus.NoContent);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /user/theme:
 *    patch:
 *      tags:
 *        - user
 *      summary: Change current user theme option
 *      produces:
 *        - "application/json"
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: ChangeThemeRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/ChangeThemeRequest"
 *      responses:
 *        204:
 *          $ref: "#/definitions/NoContent"
 *        400:
 *          $ref: "#/definitions/BadRequest"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function changeTheme(req: Request, res: Response, next: NextFunction) {
    try {
        await userService.updateTheme(req.userId, req.body.theme);
        res.sendStatus(HttpStatus.NoContent);
    } catch (error) {
        next(error);
    }
}

export const userController = {
    getUser,
    deleteAccount,
    changePassword,
    changeTheme,
};
