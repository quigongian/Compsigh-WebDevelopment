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
    const defaultPageSize = 31;
    let pageNumber = Math.max(Number(req.page), 1);
    let pageSize = req.size ? Math.max(Number(req.size), 1) : defaultPageSize;
    if (isNaN(pageNumber)) {
        pageNumber = 1;
    }
    if (isNaN(pageSize)) {
        pageSize = defaultPageSize;
    }
    checkIns = await checkInRepository.getPaginatedCheckIns(
        userId,
        pageNumber,
        pageSize
    );
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
