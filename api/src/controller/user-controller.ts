import { Request, Response, NextFunction } from "express";
import { userService } from "../service/user-service";

async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userDTO = await userService.getUserDTOById(req.userId);
        res.json(userDTO);
    } catch (error) {
        next(error);
    }
}

export const userController = {
    getUser,
};
