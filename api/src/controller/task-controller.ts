import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../util/HttpStatus";
import { taskService } from "../service/task-service";

async function getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const tasksDTOs = await taskService.getAllTaskDTOsByCompletedStatus(
            req.userId,
            req.query.completed as string | undefined
        );
        res.json(tasksDTOs);
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
        res.json(taskDTO);
    } catch (error) {
        next(error);
    }
}

async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const createdTaskDTO = await taskService.createTaskDTO(
            req.userId,
            req.body.name,
            req.body.description
        );
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
        const updatedTaskDTO = await taskService.updateTaskDTO(
            taskDTO.taskId,
            req.body.name,
            req.body.description
        );
        res.json(updatedTaskDTO);
    } catch (error) {
        next(error);
    }
}

async function completeTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        const completedTaskDTO = await taskService.complete(taskDTO.taskId);
        res.json(completedTaskDTO);
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
    completeTask,
    deleteTask,
};
