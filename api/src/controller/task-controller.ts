import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../util/HttpStatus";
import { taskService } from "../service/task-service";

async function getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const tasksDTOs = await taskService.getAllTaskDTOsByCompletedStatus(
            req.userId,
            req.query.completed as string | null
        );
        res.status(HttpStatus.OK).json(tasksDTOs);
    } catch (error) {
        next(error);
    }
}

async function getTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        res.status(HttpStatus.OK).json(taskDTO);
    } catch (error) {
        next(error);
    }
}

async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const createdTaskDTO = await taskService.createAndReturnTaskDTO({
            userId: req.userId,
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
        });
        res.status(HttpStatus.CREATED).json(createdTaskDTO);
    } catch (error) {
        next(error);
    }
}

async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        const updatedTaskDTO = await taskService.updateAndReturnTaskDTO({
            taskId: taskDTO.taskId,
            taskName: req.body.taskName,
            completed: req.body.completed,
            taskDescription: req.body.taskDescription,
        });
        res.status(HttpStatus.OK).json(updatedTaskDTO);
    } catch (error) {
        next(error);
    }
}

async function updateTaskCompletedStatus(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        const completedTaskDTO = await taskService.updateTaskCompletedStatus(
            taskDTO.taskId,
            req.body.completed
        );
        res.status(HttpStatus.OK).json(completedTaskDTO);
    } catch (error) {
        next(error);
    }
}

async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        await taskService.deleteById(taskDTO.taskId);
        res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}

export const taskController = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    completeTask: updateTaskCompletedStatus,
    deleteTask,
};
