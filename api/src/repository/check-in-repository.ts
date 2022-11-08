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
    page: number,
    size: number
): Promise<CheckIn[]> {
    return await prisma.checkIn.findMany({
        where: { userId },
        skip: (page - 1) * size,
        take: size,
        orderBy: { createdAt: "desc" },
    });
}

async function create(
    userId: number,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    comments: string | null,
    checkInstatus: CheckInStatus
): Promise<CheckIn> {
    return await prisma.checkIn.create({
        data: {
            userId,
            answer1,
            answer2,
            answer3,
            answer4,
            comments,
            checkInstatus,
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
