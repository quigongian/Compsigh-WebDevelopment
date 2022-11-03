import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../util/HttpStatus";
import { authService } from "../service/auth-service";

async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const authResponse = await authService.signIn({
            email: req.body.email,
            password: req.body.password,
        });
        res.json(authResponse);
    } catch (error) {
        next(error);
    }
}

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

async function verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const authResponse = await authService.verifyEmail({
            email: req.body.email,
            code: req.body.code,
        });
        res.json(authResponse);
    } catch (error) {
        next(error);
    }
}

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
        await authService.forgotPassword(req.body.email);
    } catch (error) {
        console.error(error);
    }
    res.sendStatus(HttpStatus.NO_CONTENT);
}

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

async function refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const refreshAccessTokenResponse = await authService.refreshAccessToken(
            req.body.refreshToken
        );
        res.json(refreshAccessTokenResponse);
    } catch (error) {
        next(error);
    }
}

export const authController = {
    signIn,
    signUp,
    verifyEmail,
    forgotPassword,
    resetPassword,
    refreshAccessToken,
};
