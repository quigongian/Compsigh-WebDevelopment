import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../util/HttpStatus";
import { authService } from "../service/auth-service";

/**
 * @swagger
 *  /auth/signin:
 *    post:
 *      tags:
 *        - auth
 *      summary: Sign in
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - in: body
 *          name: body
 *          description: SignInRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/SignInRequest"
 *      responses:
 *        200:
 *          description: Ok - Returns AuthResponse
 *          schema:
 *            $ref: "#/definitions/AuthResponse"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const authResponse = await authService.signIn({
            email: req.body.email,
            password: req.body.password,
        });
        res.status(HttpStatus.OK).json(authResponse);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /auth/signup:
 *    post:
 *      tags:
 *        - auth
 *      summary: Sign up
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - in: body
 *          name: body
 *          description: SignUpRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/SignUpRequest"
 *      responses:
 *        201:
 *          $ref: "#/definitions/Created"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        await authService.signUp({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            xpLevelId: req.body.xpLevelId,
            categoryId: req.body.categoryId,
        });
        res.sendStatus(HttpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /auth/refresh:
 *    post:
 *      tags:
 *        - auth
 *      summary: Refresh token
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: RefreshTokenRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/RefreshTokenRequest"
 *      responses:
 *        200:
 *          description: Ok - Returns RefreshTokenResponse
 *          schema:
 *            $ref: "#/definitions/RefreshTokenResponse"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const refreshAccessTokenResponse = await authService.refreshAccessToken(
            req.body.refreshToken
        );
        res.status(HttpStatus.OK).json(refreshAccessTokenResponse);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /auth/email/verify:
 *    post:
 *      tags:
 *        - auth
 *      summary: Verify email
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - in: body
 *          name: body
 *          description: VerifyEmailRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/VerifyEmailRequest"
 *      responses:
 *        200:
 *          description: Ok - Returns AuthResponse
 *          schema:
 *            $ref: "#/definitions/AuthResponse"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const authResponse = await authService.verifyEmail({
            email: req.body.email,
            code: req.body.code,
        });
        res.status(HttpStatus.OK).json(authResponse);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /auth/password/forgot:
 *    post:
 *      tags:
 *        - auth
 *      summary: Forgot password
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - in: body
 *          name: body
 *          description: ForgotPasswordRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/ForgotPasswordRequest"
 *      responses:
 *        204:
 *          $ref: "#/definitions/NoContent"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
        await authService.forgotPassword(req.body.email);
    } catch (error) {
        console.error(error);
    }
    res.sendStatus(HttpStatus.NO_CONTENT);
}

/**
 * @swagger
 *  /auth/password/reset:
 *    post:
 *      tags:
 *        - auth
 *      summary: Reset password
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - in: body
 *          name: body
 *          description: ResetPasswordRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/ResetPasswordRequest"
 *      responses:
 *        204:
 *          $ref: "#/definitions/NoContent"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        await authService.resetPassword({
            email: req.body.email,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword,
            code: req.body.code,
        });
        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}

export const authController = {
    signIn,
    signUp,
    refreshAccessToken,
    verifyEmail,
    forgotPassword,
    resetPassword,
};
