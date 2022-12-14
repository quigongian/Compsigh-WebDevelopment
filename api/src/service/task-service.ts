import { TaskDTO, createTaskdDTO } from "../models/domain";
import { taskRepository } from "../repository/task-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

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
        throw new HttpError(HttpStatus.NotFound, "Task not found");
    }
    return createTaskdDTO(task);
}

async function getTaskDTOIfBelongsToUser(
    taskId: string,
    userId: number
): Promise<TaskDTO> {
    const task = await taskRepository.getById(Number(taskId));
    if (!task) {
        throw new HttpError(HttpStatus.NotFound, "Task not found");
    }
    if (task.userId !== userId) {
        throw new HttpError(
            HttpStatus.Forbidden,
            "Task does not belong to user"
        );
    }
    return task;
}

async function createAndReturnTaskDTO(
    req: CreateTaskRequest
): Promise<TaskDTO> {
    if (!req.taskName) {
        throw new HttpError(HttpStatus.BadRequest, "Missing required fields");
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
        req.taskDescription,
        req.completed
    );
    return createTaskdDTO(task);
}

async function updateTaskCompletedStatus(
    taskId: number,
    completed: boolean
): Promise<void> {
    await taskRepository.updateCompleted(taskId, completed);
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
    completed: boolean;
}

export const taskService = {
    getAllTaskDTOsByCompletedStatus,
    getTaskDTOById,
    getTaskDTOIfBelongsToUser,
    createAndReturnTaskDTO,
    updateAndReturnTaskDTO,
    updateTaskCompletedStatus,
    deleteById,
};
