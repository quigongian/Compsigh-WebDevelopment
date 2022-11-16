import { Task } from "@prisma/client";
import { prisma } from "../util/prisma";

async function getAllByUserId(userId: number): Promise<Task[]> {
    return await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
}

async function getAllByUserIdAndCompleted(
    userId: number,
    completed: boolean
): Promise<Task[]> {
    return await prisma.task.findMany({
        where: { userId, completed },
        orderBy: { createdAt: "desc" },
    });
}

async function getById(taskId: number): Promise<Task | null> {
    return await prisma.task.findUnique({ where: { taskId } });
}

async function create(
    userId: number,
    taskName: string,
    taskDescription: string
): Promise<Task> {
    return await prisma.task.create({
        data: { userId, taskName, taskDescription },
    });
}

async function update(
    taskId: number,
    taskName: string,
    taskDescription: string,
    completed: boolean
): Promise<Task> {
    return await prisma.task.update({
        where: { taskId },
        data: {
            taskName,
            taskDescription,
            completed,
            completedAt: completed ? new Date() : null,
        },
    });
}

async function updateCompleted(
    taskId: number,
    completed: boolean
): Promise<Task> {
    return await prisma.task.update({
        where: { taskId },
        data: { completed, completedAt: completed ? new Date() : null },
    });
}

async function deleteById(taskId: number): Promise<void> {
    await prisma.task.delete({ where: { taskId } });
}

export const taskRepository = {
    getAllByUserId,
    getAllByUserIdAndCompleted,
    getById,
    create,
    update,
    updateCompleted,
    deleteById,
};
