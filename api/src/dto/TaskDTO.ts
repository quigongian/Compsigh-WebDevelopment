import { Task } from "@prisma/client";

export interface TaskDTO {
    taskId: number;
    taskName: string;
    taskDescription: string;
    completed: boolean;
    createdAt: Date;
}

export function createTaskdDTO(task: Task): TaskDTO {
    return {
        taskId: task.taskId,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        completed: task.completed,
        createdAt: task.createdAt,
    };
}
