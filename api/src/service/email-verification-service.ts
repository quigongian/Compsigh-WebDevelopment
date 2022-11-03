import { EmailVerification } from "@prisma/client";
import { emailVerificationRepository } from "../repository/email-verification-repository";
import { emailService } from "./email-service";
import { cryptUtil } from "../util/crypt-util";

async function getByUserId(userId: number): Promise<EmailVerification | null> {
    return await emailVerificationRepository.getByUserId(userId);
}

async function updateOrCreateByUserId(
    userId: number,
    code: string,
    dateExpires: Date
): Promise<EmailVerification> {
    const emailVerification = await emailVerificationRepository.getByUserId(
        userId
    );
    if (emailVerification) {
        return await emailVerificationRepository.update(
            userId,
            code,
            dateExpires
        );
    }
    return await emailVerificationRepository.create(userId, code, dateExpires);
}

async function setupEmailVerification(
    userId: number,
    email: string,
    emailVerificationType: EmailVerificationType
) {
    const code = Math.random().toString().slice(-6);
    const hashedCode = await cryptUtil.hash(code);
    const dateExpires = new Date(Date.now() + 60 * 60 * 1000);
    await updateOrCreateByUserId(userId, hashedCode, dateExpires);
    switch (emailVerificationType) {
        case EmailVerificationType.VERIFY_EMAIL:
            await emailService.sendVerificationEmail(email, code);
            break;
        case EmailVerificationType.PASSWORD_RESET:
            await emailService.sendPasswordResetEmail(email, code);
            break;
        default:
            throw new Error("Invalid email verification type");
    }
}

export enum EmailVerificationType {
    VERIFY_EMAIL,
    PASSWORD_RESET,
}

export const emailVerificationService = {
    getByUserId,
    updateOrCreateByUserId,
    setupEmailVerification,
};
