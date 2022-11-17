import { User, Theme, CheckIn, Task, Category, XpLevel } from "@prisma/client";

export interface UserDTO {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    categoryName: string;
    xpLevelName: string;
    theme: Theme;
}

export function createUserDTO(
    user: User,
    category: Category,
    xpLevel: XpLevel
): UserDTO {
    return {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        categoryName: category.categoryName,
        xpLevelName: xpLevel.xpLevelName,
        theme: user.theme,
    };
}

export interface CheckInDTO {
    checkInId: number;
    answer2: string;
    answer3: string;
    answer4: string;
    comments: string | null;
    checkInStatus: string;
    createdAt: Date;
}

export function createCheckinDTO(checkIn: CheckIn): CheckInDTO {
    return {
        checkInId: checkIn.checkInId,
        answer2: checkIn.answer2,
        answer3: checkIn.answer3,
        answer4: checkIn.answer4,
        comments: checkIn.comments,
        checkInStatus: checkIn.checkInStatus,
        createdAt: checkIn.createdAt,
    };
}

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

export interface CategoryDTO {
    categoryId: number;
    categoryName: string;
}

export function createCategoryDTO(category: Category): CategoryDTO {
    return {
        categoryId: category.categoryId,
        categoryName: category.categoryName,
    };
}

export interface XPLevelDTO {
    xpLevelId: number;
    xpLevelname: string;
}

export function createXPLevelDTO(xpLevel: XpLevel): XPLevelDTO {
    return {
        xpLevelId: xpLevel.xpLevelId,
        xpLevelname: xpLevel.xpLevelName,
    };
}
