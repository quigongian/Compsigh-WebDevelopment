import { CheckIn, CheckInStatus } from "@prisma/client";
import { prisma } from "../util/prisma";

async function getAllByUserId(userId: number): Promise<CheckIn[]> {
    return await prisma.checkIn.findMany({ where: { userId } });
}

async function getById(checkInId: number): Promise<CheckIn | null> {
    return await prisma.checkIn.findUnique({ where: { checkInId } });
}

async function getLastCheckInByUserId(userId: number): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 1,
    });
    if (checkIn.length === 0) {
        return null;
    }
    return checkIn[0];
}

async function getPaginatedCheckIns(
    userId: number,
    pageNumber: number,
    pageSize: number
): Promise<CheckIn[]> {
    return await prisma.checkIn.findMany({
        where: { userId },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
    });
}

async function create(
    userId: number,
    answer2: string,
    answer3: string,
    answer4: string,
    comments: string | null,
    checkInStatus: CheckInStatus
): Promise<CheckIn> {
    return await prisma.checkIn.create({
        data: {
            userId,
            answer2,
            answer3,
            answer4,
            comments,
            checkInStatus,
        },
    });
}

export const checkInRepository = {
    getAllByUserId,
    getById,
    getLastCheckInByUserId,
    getPaginatedCheckIns,
    create,
};
