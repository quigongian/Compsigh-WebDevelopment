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

async function createAndReturnUserDTO(
    req: CreateUserRequest
): Promise<UserDTO> {
    if (await userRepository.existsByEmail(req.email)) {
        throw new HttpError(
            HttpStatus.BAD_REQUEST,
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
        throw new HttpError(HttpStatus.BAD_REQUEST, "Missing required fields");
    }
    const strongPasswordRegEx = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    if (!strongPasswordRegEx.test(req.password)) {
        throw new HttpError(
            HttpStatus.BAD_REQUEST,
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
    verifyEmail,
    updateLastSignIn,
    updateLastCheckIn,
    deleteUser,
};
