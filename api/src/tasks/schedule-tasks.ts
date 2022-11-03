import { TaskScheduler } from "./TaskScheduler";
import { TaskFrequency } from "./Task";
import { emailTasks } from "./email-tasks";
import { userTasks } from "./user-tasks";

export enum TaskName {
    SEND_CHECK_IN_EMAIL_REMINDER = "SEND_CHECK_IN_EMAIL_REMINDER",
    SEND_VERIFY_EMAIL_REMINDER = "SEND_VERIFY_EMAIL_REMINDER",
    DELETE_PAST_DUE_UNVERIFIED_USERS = "DELETE_PAST_DUE_UNVERIFIED_USERS",
}

export default function scheduleTasks(): void {
    TaskScheduler.schedule({
        name: TaskName.SEND_CHECK_IN_EMAIL_REMINDER,
        frequency: TaskFrequency.EVERY_DAY,
        execute: emailTasks.sendCheckInEmailReminder,
    });
    TaskScheduler.schedule({
        name: TaskName.SEND_VERIFY_EMAIL_REMINDER,
        frequency: TaskFrequency.EVERY_DAY,
        execute: emailTasks.sendVerifyEmailReminder,
    });
    TaskScheduler.schedule({
        name: TaskName.DELETE_PAST_DUE_UNVERIFIED_USERS,
        frequency: TaskFrequency.EVERY_DAY,
        execute: userTasks.deletePastDueUnverifiedUsers,
    });
    // TaskScheduler.schedule({
    //     name: "LOG_DATE",
    //     frequency: TaskFrequency.EVERY_MINUTE,
    //     execute: async () => {
    //         console.log(`LOG_DATE ${new Date().toLocaleString()}`);
    //     },
    // });
}
