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
        const checkInDTOs = await checkInService.getPaginatedCheckInDTOs({
            userId: req.userId,
            page: req.query.page as string | null,
            size: req.query.size as string | null,
        });
        res.status(HttpStatus.OK).json(checkInDTOs);
    } catch (error) {
        next(error);
    }
}

async function getCheckIn(req: Request, res: Response, next: NextFunction) {
    try {
        const checkInDTO = await checkInService.getCheckInDTOById(
            req.params.checkInId
        );
        res.status(HttpStatus.OK).json(checkInDTO);
    } catch (error) {
        next(error);
    }
}

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
