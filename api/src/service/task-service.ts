import { Task } from "@prisma/client";
import { TaskDTO, createTaskdDTO } from "../dto/TaskDTO";
import { taskRepository } from "../repository/task-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function getAllByCompletedStatus(
    userId: number,
    completed: string | undefined
): Promise<Task[]> {
    if (completed === "true") {
        return await taskRepository.getAllByUserIdAndCompleted(userId, true);
    } else if (completed === "false") {
        return await taskRepository.getAllByUserIdAndCompleted(userId, false);
    }
    return await taskRepository.getAllByUserId(userId);
}

async function getAllTaskDTOsByCompletedStatus(
    userId: number,
    completed: string | undefined
): Promise<TaskDTO[]> {
    const tasks = await getAllByCompletedStatus(userId, completed);
    return tasks.map((task) => createTaskdDTO(task));
}

async function getById(taskId: number): Promise<Task> {
    const task = await taskRepository.getById(taskId);
    if (!task) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Task not found");
    }
    return task;
}

async function getTaskDTOById(taskId: number): Promise<TaskDTO> {
    const task = await getById(taskId);
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

async function create(
    userId: number,
    taskName: string,
    taskDescription: string
): Promise<Task> {
    if (!taskName) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Missing required fields");
    }
    return await taskRepository.create(userId, taskName, taskDescription);
}

async function createTaskDTO(
    userId: number,
    taskName: string,
    taskDescription: string
): Promise<TaskDTO> {
    const task = await create(userId, taskName, taskDescription);
    return createTaskdDTO(task);
}

async function update(
    taskId: number,
    taskName: string,
    taskDescription: string
): Promise<Task> {
    return await taskRepository.update(taskId, taskName, taskDescription);
}

async function updateTaskDTO(
    taskId: number,
    taskName: string,
    taskDescription: string
): Promise<TaskDTO> {
    const task = await update(taskId, taskName, taskDescription);
    return createTaskdDTO(task);
}

async function complete(taskId: number): Promise<void> {
    await taskRepository.updateCompletedAt(taskId, true);
}

async function deleteById(taskId: number): Promise<void> {
    await taskRepository.deleteById(taskId);
}

export const taskService = {
    getAllByCompletedStatus,
    getAllTaskDTOsByCompletedStatus,
    getById,
    getTaskDTOById,
    getTaskDTOIfBelongsToUser,
    create,
    createTaskDTO,
    update,
    updateTaskDTO,
    complete,
    deleteById,
};
