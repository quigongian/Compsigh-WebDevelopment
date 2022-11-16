import { Request, Response, NextFunction } from "express";
import { userService } from "../service/user-service";
import { HttpStatus } from "../util/HttpStatus";

async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userDTO = await userService.getUserDTOById(req.userId);
        res.status(HttpStatus.OK).json(userDTO);
    } catch (error) {
        next(error);
    }
}

async function changePassword(req: Request, res: Response, next: NextFunction) {
    try {
        await userService.changePassword(
            req.userId,
            req.body.oldPassword,
            req.body.password,
            req.body.repeatPassword
        );
        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}

async function deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
        await userService.deleteUser(req.userId, req.body.userName);
        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}

export const userController = {
    getUser,
    changePassword,
    deleteAccount,
};
