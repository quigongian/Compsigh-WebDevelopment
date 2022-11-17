import { User, Task, Theme } from "@prisma/client";
import { UserDTO, createUserDTO } from "../models/domain";
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
        throw new HttpError(HttpStatus.NotFound, "User not found");
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
        throw new HttpError(HttpStatus.NotFound, "User not found");
    }
    return user;
}

async function createAndReturnUserDTO(
    req: CreateUserRequest
): Promise<UserDTO> {
    if (await userRepository.existsByEmail(req.email)) {
        throw new HttpError(
            HttpStatus.BadRequest,
            "Email already exists, sign in instead"
        );
    }
    if (
        !req.firstName ||
        !req.lastName ||
        !req.userName ||
        !req.email ||
        !req.password
    ) {
        throw new HttpError(HttpStatus.BadRequest, "Missing required fields");
    }
    if (!isStrongPassword(req.password)) {
        throw new HttpError(
            HttpStatus.BadRequest,
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
    }
    req.password = await cryptUtil.hash(req.password);
    const user = await userRepository.create(
        req.firstName,
        req.lastName,
        req.userName,
        req.email,
        req.password,
        req.categoryId,
        req.xpLevelId,
        false
    );
    await createGeneratedTasksForUser(user);
    const category = await categoryService.getById(req.categoryId);
    const xpLevel = await xpLevelService.getById(req.xpLevelId);
    return createUserDTO(user, category, xpLevel);
}

async function updatePassword(
    userId: number,
    password: string,
    repeatPassword: string
): Promise<void> {
    if (password !== repeatPassword) {
        throw new HttpError(HttpStatus.BadRequest, "Passwords do not match");
    }
    if (!isStrongPassword(password)) {
        throw new HttpError(
            HttpStatus.BadRequest,
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
    }
    password = await cryptUtil.hash(password);
    await userRepository.updatePassword(userId, password);
}

async function changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
    repeatPassword: string
): Promise<void> {
    if (newPassword !== repeatPassword) {
        throw new HttpError(HttpStatus.BadRequest, "Passwords do not match");
    }
    if (!isStrongPassword(newPassword)) {
        throw new HttpError(
            HttpStatus.BadRequest,
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
    }
    const user = await userRepository.getById(userId);
    if (!user) {
        throw new HttpError(HttpStatus.NotFound, "User not found");
    }
    if (!(await cryptUtil.compare(oldPassword, user.password))) {
        throw new HttpError(HttpStatus.BadRequest, "Incorrect password");
    }
    newPassword = await cryptUtil.hash(newPassword);
    await userRepository.updatePassword(userId, newPassword);
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

async function updateTheme(userId: number, theme: string): Promise<void> {
    if (!Object.values(Theme).includes(theme as Theme)) {
        throw new HttpError(HttpStatus.BadRequest, "Invalid theme option");
    }
    await userRepository.updateTheme(userId, theme as Theme);
}

async function deleteUser(userId: number, userName: string): Promise<void> {
    const user = await userRepository.getById(userId);
    if (!user) {
        throw new HttpError(HttpStatus.NotFound, "User not found");
    }
    if (user.userName !== userName) {
        throw new HttpError(HttpStatus.BadRequest, "Incorrect user name");
    }
    await userRepository.deleteById(userId);
}

async function createGeneratedTasksForUser(user: User): Promise<void> {
    const generatedTasks =
        await generatedTaskRepository.getAllByCategoryIdAndXpLevelId(
            user.categoryId,
            user.xpLevelId
        );
    for (const generatedTask of generatedTasks) {
        await taskService.createAndReturnTaskDTO({
            userId: user.userId,
            taskName: generatedTask.generatedTaskName,
            taskDescription: generatedTask.generatedTaskDescription,
        });
    }
}

function isStrongPassword(password: string): boolean {
    const strongPasswordRegEx = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    return strongPasswordRegEx.test(password);
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    categoryId: number;
    xpLevelId: number;
}

export const userService = {
    getAllUnverifiedUsers,
    getAllPastDueUnverifiedUsers,
    getAllUsersDueCheckIn,
    getById,
    getUserDTOById,
    getByEmail,
    createAndReturnUserDTO,
    updatePassword,
    changePassword,
    verifyEmail,
    updateLastSignIn,
    updateLastCheckIn,
    updateTheme,
    deleteUser,
};
