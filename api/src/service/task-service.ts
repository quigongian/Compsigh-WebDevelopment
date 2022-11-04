import { TaskDTO, createTaskdDTO } from "../dto/TaskDTO";
import { taskRepository } from "../repository/task-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";
import { Task } from "@prisma/client";

async function getAllTaskDTOsByCompletedStatus(
    userId: number,
    completed: string | null
): Promise<TaskDTO[]> {
    let tasks;
    if (completed === "true") {
        tasks = await taskRepository.getAllByUserIdAndCompleted(userId, true);
    } else if (completed === "false") {
        tasks = await taskRepository.getAllByUserIdAndCompleted(userId, false);
    } else {
        tasks = await taskRepository.getAllByUserId(userId);
    }
    return tasks.map((task) => createTaskdDTO(task));
}

async function getTaskDTOById(taskId: number): Promise<TaskDTO> {
    const task = await taskRepository.getById(taskId);
    if (!task) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Task not found");
    }
    return createTaskdDTO(task);
}

async function getTaskDTOIfBelongsToUser(
    taskId: string,
    userId: number
): Promise<TaskDTO> {
    const task = await taskRepository.getById(Number(taskId));
    if (!task) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Task not found");
    }
    if (task.userId !== userId) {
        throw new HttpError(
            HttpStatus.FORBIDDEN,
            "Task does not belong to user"
        );
    }
    return task;
}

async function createAndReturnTaskDTO(
    req: CreateTaskRequest
): Promise<TaskDTO> {
    if (!req.taskName) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Missing required fields");
    }
    const task = await taskRepository.create(
        req.userId,
        req.taskName,
        req.taskDescription
    );
    return createTaskdDTO(task);
}

async function updateAndReturnTaskDTO(
    req: UpdateTaskRequest
): Promise<TaskDTO> {
    const task = await taskRepository.update(
        req.taskId,
        req.taskName,
        req.taskDescription
    );
    return createTaskdDTO(task);
}

async function completeTask(taskId: number): Promise<void> {
    await taskRepository.updateCompleted(taskId, true);
}

async function deleteById(taskId: number): Promise<void> {
    await taskRepository.deleteById(taskId);
}

export interface CreateTaskRequest {
    userId: number;
    taskName: string;
    taskDescription: string;
}

export interface UpdateTaskRequest {
    taskId: number;
    taskName: string;
    taskDescription: string;
}

export const taskService = {
    getAllTaskDTOsByCompletedStatus,
    getTaskDTOById,
    getTaskDTOIfBelongsToUser,
    createAndReturnTaskDTO,
    updateAndReturnTaskDTO,
    completeTask,
    deleteById,
};
