// import { CheckInStatus, Theme } from ".prisma/client";
export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    categoryName: string;
    xpLevelName: string;
    theme: Theme;
}

export interface CheckIn {
    checkInId: number;
    answer2: string;
    answer3: string;
    answer4: string;
    comments: string | undefined;
    checkInStatus: CheckInStatus;
    createdAt: Date;
}

export interface Task {
    taskId: number;
    taskName: string;
    taskDescription: string;
    completed: boolean;
    completedAt: Date | undefined;
    createdAt: Date;
}

export interface Category {
    categoryId: number;
    categoryName: string;
}

export interface XPLevel {
    xpLevelId: number;
    xpLevelname: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    categoryId: number;
    xpLevelId: number;
}

export interface RefreshAccessTokenRequest {
    refreshToken: string;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    newPassword: string;
    repeatPassword: string;
    code: string;
}

export interface UpdatePasswordRequest {
    email: string;
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
}

export interface ChangeEmailRequest {
    email: string;
}

export interface UpdateEmailRequest {
    email: string;
    code: string;
}

export interface ChangeThemeRequest {
    theme: Theme;
}

export type Theme = typeof theme[keyof typeof theme];

export const theme = {
    LIGHT: "LIGHT",
    DARK: "DARK",
};

export interface GetPaginatedCheckInRequest {
    page: string | undefined;
    size: string | undefined;
}

export interface CreateCheckInRequest {
    answer2: string;
    answer3: string;
    answer4: string;
    comments: string | undefined;
    checkInStatus: CheckInStatus;
}

export type CheckInStatus = typeof checkInStatus[keyof typeof checkInStatus];

export const checkInStatus = {
    GOOD: "GOOD",
    NEUTRAL: "NEUTRAL",
    BAD: "BAD",
};

export interface CreateTaskRequest {
    taskName: string;
    taskDescription: string;
}

export interface UpdateTaskRequest {
    taskName: string;
    taskDescription: string;
    completed: boolean;
}

export interface UpdateTaskCompletedStatusRequest {
    completed: boolean;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshAccessTokenResponse {
    accessToken: string;
}

export interface ErrorResponse {
    error: string;
}

export interface NoContentResponse {}
