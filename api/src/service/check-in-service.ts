import { CheckInStatus } from "@prisma/client";
import { CheckInDTO, createCheckinDTO } from "../dto/CheckinDTO";
import { checkInRepository } from "../repository/check-in-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function getPaginatedCheckInDTOs(
    userId: number,
    page: string | undefined,
    size: string | undefined
): Promise<CheckInDTO[]> {
    let checkIns;
    if (!page) {
        checkIns = await checkInRepository.getAllByUserId(userId);
    } else {
        checkIns = await checkInRepository.getPaginatedCheckIns(
            userId,
            Math.min(Number(page), 1),
            size ? Number(size) : 31
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
    userId: number,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    comments: string | null,
    checkInStatusStr: string
): Promise<CheckInDTO> {
    let checkInStatus: CheckInStatus;
    switch (checkInStatusStr) {
        case CheckInStatus.GOOD:
            checkInStatus = CheckInStatus.GOOD;
            break;
        case CheckInStatus.NEUTRAL:
            checkInStatus = CheckInStatus.NEUTRAL;
            break;
        case CheckInStatus.BAD:
            checkInStatus = CheckInStatus.BAD;
            break;
        default:
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                "Invalid check in status"
            );
    }
    const checkIn = await checkInRepository.create(
        userId,
        answer1,
        answer2,
        answer3,
        answer4,
        comments,
        checkInStatus
    );
    return createCheckinDTO(checkIn);
}

export const checkInService = {
    getPaginatedCheckInDTOs,
    getCheckInDTOById,
    createAndReturnCheckInDTO,
};
