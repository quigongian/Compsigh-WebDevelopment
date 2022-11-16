import { Request, Response, NextFunction } from "express";
import { xpLevelService } from "../service/xp-level-service";
import { HttpStatus } from "../util/HttpStatus";

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
