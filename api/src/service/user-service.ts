import { User, Task } from "@prisma/client";
import { UserDTO, createUserDTO } from "../dto/UserDTO";
import { userRepository } from "../repository/user-repository";
import { taskService } from "../service/task-service";
import { categoryService } from "./category-service";
import { xpLevelService } from "./xp-level-service";
import { generatedTaskRepository } from "../repository/generated-task-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";
import { cryptUtil } from "../util/crypt-util";

async function getAllUnverifiedUsers(): Promise<User[]> {
    return await userRepository.getAllUnverifiedUsers();
}

async function getAllPastDueUnverifiedUsers(): Promise<User[]> {
    const numDaysAccountExpiration = 7;
    const date = new Date();
    date.setDate(date.getDate() - numDaysAccountExpiration);
    return await userRepository.getAllUnverifiedUsersCreatedBeforeDate(date);
}

async function getAllUsersDueCheckIn(): Promise<User[]> {
    const numDaysNotCheckedIn = 3;
    const date = new Date();
    date.setDate(date.getDate() - numDaysNotCheckedIn);
    return await userRepository.getAllLastChecInBeforeDate(date);
}

async function getById(userId: number): Promise<User> {
    const user = await userRepository.getById(userId);
    if (!user) {
        throw new HttpError(HttpStatus.NOT_FOUND, "User not found");
    }
    return user;
}

async function getUserDTOById(userId: number): Promise<UserDTO> {
    const user = await getById(userId);
    const category = await categoryService.getById(user.categoryId);
    const xpLevel = await xpLevelService.getById(user.xpLevelId);
    return createUserDTO(user, category, xpLevel);
}

async function getByEmail(email: string): Promise<User> {
    const user = await userRepository.getByEmail(email);
    if (!user) {
        throw new HttpError(HttpStatus.NOT_FOUND, "User not found");
    }
    return user;
}

async function create(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    categoryId: number,
    xpLevelId: number
): Promise<User> {
    if (!firstName || !lastName || !userName || !email || !password) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Missing required fields");
    }
    password = await cryptUtil.hash(password);
    return await userRepository.create(
        firstName,
        lastName,
        userName,
        email,
        password,
        categoryId,
        xpLevelId,
        false
    );
}

async function createGeneratedTasksForUser(user: User): Promise<void> {
    const generatedTasks =
        await generatedTaskRepository.getAllByCategoryIdAndXpLevelId(
            user.categoryId,
            user.xpLevelId
        );
    for (const generatedTask of generatedTasks) {
        await taskService.create(
            user.userId,
            generatedTask.generatedTaskName,
            generatedTask.generatedTaskDescription
        );
    }
}

async function updatePassword(userId: number, password: string): Promise<void> {
    password = await cryptUtil.hash(password);
    await userRepository.updatePassword(userId, password);
}

async function verifyEmail(userId: number): Promise<void> {
    await userRepository.updateEmailVerified(userId, true);
}

async function updateLastCheckIn(userId: number): Promise<void> {
    await userRepository.updateLastCheckIn(userId, new Date());
}

async function updateLastSignIn(userId: number): Promise<void> {
    await userRepository.updateLastSignIn(userId, new Date());
}

async function deleteUser(userId: number): Promise<void> {
    await userRepository.deleteById(userId);
}

export const userService = {
    getAllUnverifiedUsers,
    getAllPastDueUnverifiedUsers,
    getAllUsersDueCheckIn,
    getById,
    getUserDTOById,
    getByEmail,
    create,
    createGeneratedTasksForUser,
    updatePassword,
    verifyEmail,
    updateLastSignIn,
    updateLastCheckIn,
    deleteUser,
};
