import { TaskDTO, createTaskdDTO } from "../dto/TaskDTO";
import { taskRepository } from "../repository/task-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function getAllTaskDTOsByCompletedStatus(
    userId: number,
    completed: string | undefined
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

async function createTaskDTO(
    userId: number,
    taskName: string,
    taskDescription: string
): Promise<TaskDTO> {
    if (!taskName) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Missing required fields");
    }
    const task = await taskRepository.create(userId, taskName, taskDescription);
    return createTaskdDTO(task);
}

async function updateTaskDTO(
    taskId: number,
    taskName: string,
    taskDescription: string
): Promise<TaskDTO> {
    const task = await taskRepository.update(taskId, taskName, taskDescription);
    return createTaskdDTO(task);
}

async function complete(taskId: number): Promise<void> {
    await taskRepository.updateCompleted(taskId, true);
}

async function deleteById(taskId: number): Promise<void> {
    await taskRepository.deleteById(taskId);
}

export const taskService = {
    getAllTaskDTOsByCompletedStatus,
    getTaskDTOById,
    getTaskDTOIfBelongsToUser,
    createTaskDTO,
    updateTaskDTO,
    complete,
    deleteById,
};
