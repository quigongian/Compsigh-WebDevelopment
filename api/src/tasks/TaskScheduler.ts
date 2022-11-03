import cron from "node-cron";
import { Task } from "./Task";
import { ScheduledTask } from "./ScheduledTask";

export class TaskScheduler {
    private static scheduledTasks: Map<string, ScheduledTask> = new Map();

    public static schedule(task: Task): void {
        const cronTask = cron.schedule(task.frequency, task.execute);
        this.scheduledTasks.set(task.name, {
            ...task,
            ...cronTask,
        });
    }

    public static start(taskName: string): void {
        this.scheduledTasks.get(taskName)?.start();
    }

    public static stop(taskName: string): void {
        this.scheduledTasks.get(taskName)?.stop();
    }
}
