import { userService } from "../service/user-service";
import { emailService } from "../service/email-service";

async function sendVerifyEmailReminder(): Promise<void> {
    const users = await userService.getAllUnverifiedUsers();
    for (const user of users) {
        const numDaysAccountExpiration = 7;
        const accountExpirationDate = new Date(user.createdAt);
        accountExpirationDate.setDate(
            accountExpirationDate.getDate() + numDaysAccountExpiration
        );
        await emailService.sendVerifyEmailReminderEmail(
            user.email,
            user.firstName,
            accountExpirationDate
        );
    }
}

async function sendCheckInEmailReminder(): Promise<void> {
    const users = await userService.getAllUsersDueCheckIn();
    for (const user of users) {
        if (user.lastCheckIn) {
            const milisecondsInDay = 1000 * 60 * 60 * 24;
            const daysSinceLastCheckIn = Math.floor(
                (Date.now() - user.lastCheckIn.getTime()) / milisecondsInDay
            );
            await emailService.sendCheckInReminderEmail(
                user.email,
                user.firstName,
                daysSinceLastCheckIn
            );
        }
    }
}

export const emailTasks = { sendVerifyEmailReminder, sendCheckInEmailReminder };
