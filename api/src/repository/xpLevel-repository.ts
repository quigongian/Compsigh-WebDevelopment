import { XpLevel } from "@prisma/client";
import { prisma } from "../util/prisma";

async function getAll(): Promise<XpLevel[]> {
    return await prisma.xpLevel.findMany();
}

async function getById(xpLevelId: number): Promise<XpLevel | null> {
    return await prisma.xpLevel.findUnique({ where: { xpLevelId } });
}

export const xpLevelRepository = {
    getAll,
    getById,
};
