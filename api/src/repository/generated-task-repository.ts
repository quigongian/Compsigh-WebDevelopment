import { GeneratedTask } from "@prisma/client";
import {prisma} from "../util/prisma";

async function getAllByCategoryIdAndXpLevelId(
    categoryId: number,
    xpLevelId: number
): Promise<GeneratedTask[]> {
    return await prisma.generatedTask.findMany({
        where: {
            categories: { some: { categoryId: categoryId } },
            xpLevelId: xpLevelId,
        },
    });
}

export const generatedTaskRepository = {
    getAllByCategoryIdAndXpLevelId,
};
