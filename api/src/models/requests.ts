import { CheckInStatus, Theme } from ".prisma/client";

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

export interface DeleteUserRequest {
    userName: number;
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
