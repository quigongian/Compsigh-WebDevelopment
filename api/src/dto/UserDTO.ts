import { Category, User, XpLevel } from "@prisma/client";

export interface UserDTO {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    categoryName: string;
    xpLevelName: string;
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
    };
}
