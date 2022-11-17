import { User, Theme } from "@prisma/client";
import { prisma } from "../util/prisma";

async function getAllUnverifiedUsers(): Promise<User[]> {
    return await prisma.user.findMany({ where: { emailVerified: false } });
}

async function getAllUnverifiedUsersCreatedBeforeDate(
    date: Date
): Promise<User[]> {
    return await prisma.user.findMany({
        where: { emailVerified: false, createdAt: { lt: date } },
    });
}

async function getAllLastChecInBeforeDate(date: Date): Promise<User[]> {
    return await prisma.user.findMany({ where: { lastCheckIn: { lt: date } } });
}

async function getById(userId: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { userId } });
}

async function getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
}

async function existsByEmail(email: string): Promise<boolean> {
    return (await prisma.user.count({ where: { email } })) > 0;
}

async function create(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    categoryId: number,
    xpLevelId: number,
    emailVerified: boolean
): Promise<User> {
    return await prisma.user.create({
        data: {
            firstName,
            lastName,
            userName,
            email,
            password,
            categoryId,
            xpLevelId,
            emailVerified,
        },
    });
}

async function updatePassword(userId: number, password: string): Promise<User> {
    return await prisma.user.update({
        where: { userId },
        data: { password },
    });
}

async function updateEmailVerified(
    userId: number,
    emailVerified: boolean
): Promise<User> {
    return await prisma.user.update({
        where: { userId },
        data: { emailVerified },
    });
}

async function updateLastCheckIn(
    userId: number,
    lastCheckIn: Date
): Promise<User> {
    return await prisma.user.update({
        where: { userId },
        data: { lastCheckIn },
    });
}

async function updateLastSignIn(
    userId: number,
    lastSignIn: Date
): Promise<User> {
    return await prisma.user.update({
        where: { userId },
        data: { lastSignIn },
    });
}

async function updateTheme(userId: number, theme: Theme): Promise<User> {
    return await prisma.user.update({
        where: { userId },
        data: { theme },
    });
}

async function deleteById(userId: number): Promise<void> {
    await prisma.user.delete({ where: { userId } });
}

export const userRepository = {
    getAllUnverifiedUsers,
    getAllUnverifiedUsersCreatedBeforeDate,
    getAllLastChecInBeforeDate,
    getById,
    getByEmail,
    existsByEmail,
    create,
    updatePassword,
    updateEmailVerified,
    updateLastSignIn,
    updateLastCheckIn,
    updateTheme,
    deleteById,
};
