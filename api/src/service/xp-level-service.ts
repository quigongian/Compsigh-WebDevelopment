import { XpLevel } from "@prisma/client";
import { xpLevelRepository } from "../repository/xpLevel-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function getAll(): Promise<XpLevel[]> {
    return await xpLevelRepository.getAll();
}

async function getById(xpLevelId: number): Promise<XpLevel> {
    const xpLevel = await xpLevelRepository.getById(xpLevelId);
    if (!xpLevel) {
        throw new HttpError(HttpStatus.NOT_FOUND, "XpLevel not found");
    }
    return xpLevel;
}

export const xpLevelService = { getAll, getById };
