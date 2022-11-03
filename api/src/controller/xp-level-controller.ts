import { Request, Response, NextFunction } from "express";
import { xpLevelService } from "../service/xp-level-service";

async function getAllXpLevels(req: Request, res: Response, next: NextFunction) {
    try {
        const xpLevels = await xpLevelService.getAll();
        res.json(xpLevels);
    } catch (error) {
        next(error);
    }
}

export const xpLevelController = {
    getAllXpLevels,
};
