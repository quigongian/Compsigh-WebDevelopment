import { Request, Response, NextFunction } from "express";
import { checkInService } from "../service/check-in-service";
import { userService } from "../service/user-service";
import { HttpStatus } from "../util/HttpStatus";

async function getPaginatedCheckIns(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const checkInDTOs = await checkInService.getPaginatedCheckInDTOs(
            req.userId,
            req.query.page as string | undefined,
            req.query.size as string | undefined
        );
        res.json(checkInDTOs);
    } catch (error) {
        next(error);
    }
}

async function getCheckIn(req: Request, res: Response, next: NextFunction) {
    try {
        const checkInDTO = await checkInService.getCheckInDTOById(
            req.params.checkInId
        );
        res.json(checkInDTO);
    } catch (error) {
        next(error);
    }
}

async function makeCheckIn(req: Request, res: Response, next: NextFunction) {
    try {
        const checkIn = await checkInService.createAndReturnCheckInDTO(
            req.userId,
            req.body.answer1,
            req.body.answer2,
            req.body.answer3,
            req.body.answer4,
            req.body.comments,
            req.body.status
        );
        await userService.updateLastCheckIn(req.userId);
        res.status(HttpStatus.CREATED).json(checkIn);
    } catch (error) {
        next(error);
    }
}

export const checkInController = {
    getPaginatedCheckIns,
    getCheckIn,
    makeCheckIn,
};
