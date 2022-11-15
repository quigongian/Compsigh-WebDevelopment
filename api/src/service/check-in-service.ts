import { CheckInStatus } from "@prisma/client";
import { CheckInDTO, createCheckinDTO } from "../dto/CheckinDTO";
import { checkInRepository } from "../repository/check-in-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function getPaginatedCheckInDTOs(
    req: GetPaginatedCheckInRequest
): Promise<CheckInDTO[]> {
    let checkIns;
    if (!req.page) {
        checkIns = await checkInRepository.getAllByUserId(req.userId);
    } else {
        const defaultPageSize = 31;
        const pageNumber = Math.max(Number(req.page), 1);
        const pageSize = req.size
            ? Math.max(Number(req.size), 1)
            : defaultPageSize;
        checkIns = await checkInRepository.getPaginatedCheckIns(
            req.userId,
            pageNumber,
            pageSize
        );
    }
    return checkIns.map((checkIn) => createCheckinDTO(checkIn));
}

async function getCheckInDTOById(checkInId: string): Promise<CheckInDTO> {
    const checkIn = await checkInRepository.getById(Number(checkInId));
    if (!checkIn) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Check in not found");
    }
    return createCheckinDTO(checkIn);
}

async function createAndReturnCheckInDTO(
    req: CreateCheckInRequest
): Promise<CheckInDTO> {
    if (
        !Object.values(CheckInStatus).includes(
            req.checkInStatus as CheckInStatus
        )
    ) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Invalid check in status");
    }
    const checkIn = await checkInRepository.create(
        req.userId,
        req.answer2,
        req.answer3,
        req.answer4,
        req.comments,
        req.checkInStatus as CheckInStatus
    );
    return createCheckinDTO(checkIn);
}

export interface GetPaginatedCheckInRequest {
    userId: number;
    page: string | null;
    size: string | null;
}

export interface CreateCheckInRequest {
    userId: number;
    answer2: string;
    answer3: string;
    answer4: string;
    comments: string | null;
    checkInStatus: string;
}

export const checkInService = {
    getPaginatedCheckInDTOs,
    getCheckInDTOById,
    createAndReturnCheckInDTO,
};
