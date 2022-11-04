import { CheckIn } from "@prisma/client";

export interface CheckInDTO {
    checkInId: number;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    comments: string | null;
    checkInStatus: string;
    createdAt: Date;
}

export function createCheckinDTO(checkIn: CheckIn): CheckInDTO {
    return {
        checkInId: checkIn.checkInId,
        answer1: checkIn.answer1,
        answer2: checkIn.answer2,
        answer3: checkIn.answer3,
        answer4: checkIn.answer4,
        comments: checkIn.comments,
        checkInStatus: checkIn.checkInStatus,
        createdAt: checkIn.createdAt,
    };
}
