import { GeneratedTask } from "@prisma/client";
import { generatedTaskRepository } from "../repository/generated-task-repository";

async function getAllByCategoryIdAndXpLevelId(
    categoryId: number,
    xpLevelId: number
): Promise<GeneratedTask[]> {
    return await generatedTaskRepository.getAllByCategoryIdAndXpLevelId(
        categoryId,
        xpLevelId
    );
}

export const generatedTaskService = { getAllByCategoryIdAndXpLevelId };
