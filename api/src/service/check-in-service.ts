import { CheckInStatus } from "@prisma/client";
import { CheckInDTO, createCheckinDTO } from "../models/domain";
import {
    CreateCheckInRequest,
    GetPaginatedCheckInRequest,
} from "../models/requests";
import { checkInRepository } from "../repository/check-in-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function getPaginatedCheckInDTOs(
    userId: number,
    req: GetPaginatedCheckInRequest
): Promise<CheckInDTO[]> {
    let checkIns;
    let pageNumber = Number(req.page);
    let pageSize = Number(req.page);
    if (isNaN(pageNumber) || isNaN(pageSize)) {
        checkIns = await checkInRepository.getAllByUserId(userId);
    } else {
        const defaultPageSize = 31;
        pageNumber = isNaN(pageNumber) ? 1 : Math.max(pageNumber, 1);
        pageSize = isNaN(pageSize) ? defaultPageSize : Math.max(pageSize, 1);
        checkIns = await checkInRepository.getPaginatedCheckIns(
            userId,
            pageNumber,
            pageSize
        );
    }
    return checkIns.map((checkIn) => createCheckinDTO(checkIn));
}

async function getCheckInDTOById(checkInId: string): Promise<CheckInDTO> {
    const checkIn = await checkInRepository.getById(Number(checkInId));
    if (!checkIn) {
        throw new HttpError(HttpStatus.NotFound, "Check in not found");
    }
    return createCheckinDTO(checkIn);
}

async function createAndReturnCheckInDTO(
    userId: number,
    req: CreateCheckInRequest
): Promise<CheckInDTO> {
    if (
        !Object.values(CheckInStatus).includes(
            req.checkInStatus as CheckInStatus
        )
    ) {
        throw new HttpError(HttpStatus.BadRequest, "Invalid check in status");
    }
    let checkIn;
    checkIn = await checkInRepository.getLastCheckInByUserId(userId);
    if (checkIn && checkIn.createdAt.getDay() === new Date().getDay()) {
        throw new HttpError(
            HttpStatus.BadRequest,
            "User has already checked in today"
        );
    }
    checkIn = await checkInRepository.create(
        userId,
        req.answer2,
        req.answer3,
        req.answer4,
        req.comments,
        req.checkInStatus as CheckInStatus
    );
    return createCheckinDTO(checkIn);
}

export const checkInService = {
    getPaginatedCheckInDTOs,
    getCheckInDTOById,
    createAndReturnCheckInDTO,
};
