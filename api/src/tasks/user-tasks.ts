import { userService } from "../service/user-service";

async function deletePastDueUnverifiedUsers(): Promise<void> {
    const unverifiedUsers = await userService.getAllPastDueUnverifiedUsers();
    for (const user of unverifiedUsers) {
        await userService.deleteUser(user.userId, user.email);
    }
}

export const userTasks = {
    deletePastDueUnverifiedUsers,
};
