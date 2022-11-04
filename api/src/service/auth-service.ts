import { jwtUtil } from "../util/jwt-util";
import { cryptUtil } from "../util/crypt-util";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";
import { userService, CreateUserRequest } from "./user-service";
import {
    emailVerificationService,
    EmailVerificationType,
} from "./email-verification-service";

async function signIn(req: SignInRequest): Promise<AuthResponse> {
    const user = await userService.getByEmail(req.email);
    if (!user.emailVerified) {
        await emailVerificationService.setupEmailVerification(
            user.userId,
            user.email,
            EmailVerificationType.VERIFY_EMAIL
        );
        throw new HttpError(HttpStatus.UNAUTHORIZED, "Please verify email");
    }
    if (!cryptUtil.compare(req.password, user.password)) {
        throw new HttpError(HttpStatus.UNAUTHORIZED, "Wrong email or password");
    }
    await userService.updateLastSignIn(user.userId);
    const accessToken = jwtUtil.generateAccessJWT(user.userId);
    const refreshToken = jwtUtil.generateRefreshJWT(user.userId, accessToken);
    return { accessToken, refreshToken };
}

async function signUp(req: SignUpRequest): Promise<void> {
    const userDTO = await userService.createAndReturnUserDTO(
        req as CreateUserRequest
    );
    await emailVerificationService.setupEmailVerification(
        userDTO.userId,
        userDTO.email,
        EmailVerificationType.VERIFY_EMAIL
    );
}

async function verifyEmail(req: VerifyEmailRequest): Promise<AuthResponse> {
    const user = await userService.getByEmail(req.email);
    if (user.emailVerified) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Email already verified");
    }
    const emailVerification = await emailVerificationService.getByUserId(
        user.userId
    );
    if (
        !emailVerification ||
        !(await cryptUtil.compare(req.code, emailVerification.code))
    ) {
        throw new HttpError(
            HttpStatus.UNAUTHORIZED,
            "Invalid verification code"
        );
    }
    if (emailVerification.expiresAt < new Date()) {
        throw new HttpError(HttpStatus.UNAUTHORIZED, "Code expired");
    }
    await userService.verifyEmail(user.userId);
    const accessToken = jwtUtil.generateAccessJWT(user.userId);
    const refreshToken = jwtUtil.generateRefreshJWT(user.userId, accessToken);
    return { accessToken, refreshToken };
}

async function forgotPassword(email: string): Promise<void> {
    const user = await userService.getByEmail(email);
    await emailVerificationService.setupEmailVerification(
        user.userId,
        user.email,
        EmailVerificationType.PASSWORD_RESET
    );
}

async function resetPassword(req: ResetPasswordRequest): Promise<void> {
    if (req.password !== req.repeatPassword) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Passwords do not match");
    }
    const user = await userService.getByEmail(req.email);
    const emailVerification = await emailVerificationService.getByUserId(
        user.userId
    );
    if (
        !emailVerification ||
        !(await cryptUtil.compare(req.code, emailVerification.code))
    ) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Invalid code");
    }
    if (emailVerification.expiresAt < new Date()) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Code expired");
    }
    await userService.updatePassword(user.userId, req.password);
}

async function refreshAccessToken(
    req: RefreshAccessTokenRequest
): Promise<RefreshAccessTokenResponse> {
    const { userId } = jwtUtil.verifyRefreshToken(req.refreshToken);
    if (userId !== req.userId) {
        throw new HttpError(HttpStatus.UNAUTHORIZED, "Invalid refresh token");
    }
    await userService.updateLastSignIn(userId);
    const accessToken = jwtUtil.generateAccessJWT(userId);
    return { accessToken };
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    categoryId: number;
    xpLevelId: number;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface ResetPasswordRequest {
    email: string;
    password: string;
    repeatPassword: string;
    code: string;
}

export interface RefreshAccessTokenRequest {
    userId: number;
    refreshToken: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshAccessTokenResponse {
    accessToken: string;
}

export const authService = {
    signIn,
    signUp,
    verifyEmail,
    forgotPassword,
    resetPassword,
    refreshAccessToken,
};
