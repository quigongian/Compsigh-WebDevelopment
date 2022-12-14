import { EmailVerification, User } from "@prisma/client";
import { prisma } from "../util/prisma";

async function getByUserId(userId: number): Promise<EmailVerification | null> {
    return await prisma.emailVerification.findUnique({ where: { userId } });
}

async function create(
    userId: number,
    code: string,
    email: string,
    expiresAt: Date
): Promise<EmailVerification> {
    return await prisma.emailVerification.create({
        data: { userId, code, expiresAt, email },
    });
}

async function update(
    userId: number,
    code: string,
    email: string,
    expiresAt: Date
): Promise<EmailVerification> {
    return await prisma.emailVerification.update({
        where: { userId },
        data: { code, email, expiresAt },
    });
}

export const emailVerificationRepository = {
    getByUserId,
    create,
    update,
};
