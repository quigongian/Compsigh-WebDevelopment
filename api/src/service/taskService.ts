import { Prisma, Task } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import HttpError from "../util/httpError";
import HttpStatus from "../util/httpStatus";

async function validateTaskBelongsToUser(req: Request): Promise<Task> {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const task = await prisma.task.findUnique({
        where: {
            task_id: Number(taskId),
        },
    });
    if (task == null) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Task not found");
    }
    if (task.user_id !== Number(userId)) {
        throw new HttpError(
            HttpStatus.FORBIDDEN,
            "Task does not belong to user"
        );
    }
    return task;
}

async function getAllTasks(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const completed = req.query.completed;
    const tasks = await prisma.task.findMany({
        where: {
            user_id: Number(userId),
            completed:
                completed === "true"
                    ? true
                    : completed === "false"
                    ? false
                    : undefined,
        },
    });
    res.json(tasks);
}

async function getTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await validateTaskBelongsToUser(req);
        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function createTask(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const { taskName, taskDescription } = req.body;
    const task = await prisma.task.create({
        data: {
            user_id: Number(userId),
            task_name: taskName,
            task_description: taskDescription,
        },
    });
    res.status(HttpStatus.CREATED).json(task);
}

async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await validateTaskBelongsToUser(req);
        const { taskName, taskDescription } = req.body;
        const updatedTask = await prisma.task.update({
            where: {
                task_id: task.task_id,
            },
            data: {
                task_name: taskName,
                task_description: taskDescription,
            },
        });
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
}

async function completeTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await validateTaskBelongsToUser(req);
        const completedTask = await prisma.task.update({
            where: {
                task_id: task.task_id,
            },
            data: {
                completed: true,
                date_completed: new Date(),
            },
        });
        res.json(completedTask);
    } catch (error) {
        next(error);
    }
}

async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await validateTaskBelongsToUser(req);
        await prisma.task.delete({
            where: {
                task_id: task.task_id,
            },
        });
        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}

export default {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
};
