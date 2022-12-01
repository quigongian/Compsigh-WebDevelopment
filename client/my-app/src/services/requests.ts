import { AxiosResponse } from "axios";
import { httpClient } from "./http-client";
import {
    AuthResponse,
    Category,
    ChangeEmailRequest,
    ChangeThemeRequest,
    CheckIn,
    CreateCheckInRequest,
    CreateTaskRequest,
    ForgotPasswordRequest,
    NoContentResponse,
    ResetPasswordRequest,
    SignInRequest,
    SignUpRequest,
    Task,
    UpdateEmailRequest,
    UpdatePasswordRequest,
    UpdateTaskCompletedStatusRequest,
    UpdateTaskRequest,
    User,
    VerifyEmailRequest,
    XPLevel,
} from "./models";

const signIn = (req: SignInRequest): Promise<AxiosResponse<AuthResponse>> => {
    return httpClient.post("/auth/signin", req);
};

const signUp = (
    req: SignUpRequest
): Promise<AxiosResponse<NoContentResponse>> => {
    return httpClient.post("/auth/signup", req);
};

const verifyEmail = (
    req: VerifyEmailRequest
): Promise<AxiosResponse<AuthResponse>> => {
    return httpClient.post("/auth/email/verify", req);
};

const forgotPassword = (
    req: ForgotPasswordRequest
): Promise<AxiosResponse<NoContentResponse>> => {
    return httpClient.post("/auth/password/forgot", req);
};

const resetPassword = (
    req: ResetPasswordRequest
): Promise<AxiosResponse<NoContentResponse>> => {
    return httpClient.post("/auth/password/reset", req);
};

const getUser = (): Promise<AxiosResponse<User>> => {
    return httpClient.get("/user");
};

const deleteUser = (
    email: string
): Promise<AxiosResponse<NoContentResponse>> => {
    return httpClient.delete(`/user/${email}`);
};

const updatePassword = (
    req: UpdatePasswordRequest
): Promise<AxiosResponse<NoContentResponse>> => {
    return httpClient.patch("/user/password", req);
};

const requestEmailChange = (
    req: ChangeEmailRequest
): Promise<AxiosResponse<NoContentResponse>> => {
    return httpClient.post("/user/email", req);
};

const updateUserEmail = (
    req: UpdateEmailRequest
): Promise<AxiosResponse<NoContentResponse>> => {
    return httpClient.patch("/user/email", req);
};

const changeTheme = (
    req: ChangeThemeRequest
): Promise<AxiosResponse<NoContentResponse>> => {
    return httpClient.patch("/user/theme", req);
};

const getPaginatedCheckIns = (
    page?: number,
    size?: number
): Promise<AxiosResponse<CheckIn[]>> => {
    return httpClient.get(`/checkin?page=${page}&size=${size}`);
};

const createCheckIn = (
    req: CreateCheckInRequest
): Promise<AxiosResponse<CheckIn>> => {
    return httpClient.post("/checkin", req);
};

const getCheckIn = (checkInId: number): Promise<AxiosResponse<CheckIn>> => {
    return httpClient.get(`/checkin/${checkInId}`);
};

const getTasksByStatus = (
    completedStatus?: boolean
): Promise<AxiosResponse<Task[]>> => {
    return httpClient.get(`/task?completed=${completedStatus}`);
};

const createTask = (req: CreateTaskRequest): Promise<AxiosResponse<Task>> => {
    return httpClient.post("/task", req);
};

const getTask = (taskId: number): Promise<AxiosResponse<Task>> => {
    return httpClient.get(`/task/${taskId}`);
};

const updateTask = (
    taskId: number,
    req: UpdateTaskRequest
): Promise<AxiosResponse<Task>> => {
    return httpClient.put(`/task/${taskId}`, req);
};

const deleteTask = (taskId: number): Promise<AxiosResponse<Task>> => {
    return httpClient.delete(`/task/${taskId}`);
};

const updateTaskCompletedStatus = (
    taskId: number,
    req: UpdateTaskCompletedStatusRequest
): Promise<AxiosResponse<Task>> => {
    return httpClient.patch(`/task/${taskId}/complete`, req);
};

const getCategories = (): Promise<AxiosResponse<Category[]>> => {
    return httpClient.get("/category");
};

const getXpLevels = (): Promise<AxiosResponse<XPLevel[]>> => {
    return httpClient.get("/xplevel");
};

const ping = (): Promise<string> => {
    return httpClient.get("/ping");
};

export {
    signIn,
    signUp,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getUser,
    deleteUser,
    updatePassword,
    requestEmailChange,
    updateUserEmail,
    changeTheme,
    getPaginatedCheckIns,
    createCheckIn,
    getCheckIn,
    getTasksByStatus,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    updateTaskCompletedStatus,
    getCategories,
    getXpLevels,
    ping,
};
