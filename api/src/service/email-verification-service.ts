import { EmailVerification } from "@prisma/client";
import { emailVerificationRepository } from "../repository/email-verification-repository";
import { emailService } from "./email-service";
import { cryptUtil } from "../util/crypt-util";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function getByUserId(userId: number): Promise<EmailVerification | null> {
    return await emailVerificationRepository.getByUserId(userId);
}

async function updateOrCreateByUserId(
    userId: number,
    code: string,
    email: string,
    expiresAt: Date
): Promise<EmailVerification> {
    const emailVerification = await emailVerificationRepository.getByUserId(
        userId
    );
    if (emailVerification) {
        return await emailVerificationRepository.update(
            userId,
            code,
            email,
            expiresAt
        );
    }
    return await emailVerificationRepository.create(
        userId,
        code,
        email,
        expiresAt
    );
}

async function setupEmailVerification(
    userId: number,
    email: string,
    emailVerificationType: EmailVerificationType
) {
    const code = Math.random().toString().slice(-6);
    const hashedCode = await cryptUtil.hash(code);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await updateOrCreateByUserId(userId, hashedCode, email, expiresAt);
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

async function verifyCodeAgainstEmail(
    userId: number,
    email: string,
    code: string
): Promise<void> {
    const emailVerification = await emailVerificationRepository.getByUserId(
        userId
    );
    if (
        !emailVerification ||
        emailVerification.email !== email ||
        !(await cryptUtil.compare(code, emailVerification.code))
    ) {
        throw new HttpError(
            HttpStatus.Unauthorized,
            "Invalid verification code"
        );
    }
    if (emailVerification.expiresAt < new Date()) {
        throw new HttpError(HttpStatus.Unauthorized, "Code expired");
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
    verifyCodeAgainstEmail,
};
