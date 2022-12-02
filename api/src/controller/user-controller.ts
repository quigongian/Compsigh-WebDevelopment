import { Request, Response, NextFunction } from "express";
import {
    emailVerificationService,
    EmailVerificationType,
} from "../service/email-verification-service";
import { userService } from "../service/user-service";
import { HttpStatus } from "../util/HttpStatus";

/**
 * @swagger
 *  /user:
 *    get:
 *      tags:
 *        - user
 *      summary: Get current user
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
 *      summary: Delete user account
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: path
 *          name: email
 *          schema:
 *            type: string
 *          required: true
 *          description: email
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
        await userService.deleteUser(req.userId, req.params.email);
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
 *      summary: Change user password
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: UpdatePasswordRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/UpdatePasswordRequest"
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
async function updatePassword(req: Request, res: Response, next: NextFunction) {
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
 *  /user/email:
 *    post:
 *      tags:
 *        - user
 *      summary: Request email change
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: ChangeEmailRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/ChangeEmailRequest"
 *      responses:
 *        204:
 *          $ref: "#/definitions/NoContent"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function changeEmail(req: Request, res: Response, next: NextFunction) {
    try {
        await emailVerificationService.setupEmailVerification(
            req.userId,
            req.body.email,
            EmailVerificationType.VERIFY_EMAIL
        );
        res.sendStatus(HttpStatus.NoContent);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /user/email:
 *    patch:
 *      tags:
 *        - user
 *      summary: Change user email
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: UpdateEmailRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/UpdateEmailRequest"
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
async function updateEmail(req: Request, res: Response, next: NextFunction) {
    try {
        await userService.updateEmail(req.userId, {
            email: req.body.email,
            code: req.body.code,
        });
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
 *      summary: Change user theme option
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
    updatePassword,
    changeEmail,
    updateEmail,
    changeTheme,
};
