import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        swagger: "2.0",
        info: {
            version: "1.0.0",
            title: "CompSigh API",
            description: "API for [CompSigh](http://localhost:3000)",
        },
        host: "localhost:8080",
        basePath: "/api/v1",
        schemes: ["http"],
        securityDefinitions: {
            JWT: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
                description: 'Authorization header: "Bearer [token]"',
            },
        },
        tags: [
            { name: "auth" },
            { name: "user" },
            { name: "checkin" },
            { name: "task" },
            { name: "category" },
            { name: "xplevel" },
            { name: "healthcheck" },
        ],
        definitions: {
            UserDTO: {
                type: "object",
                required: [
                    "userId",
                    "userName",
                    "firstName",
                    "lastName",
                    "email",
                    "categoryName",
                    "xpLevelId",
                    "xpLevelName",
                    "theme	",
                ],
                properties: {
                    userId: { type: "integer", format: "int64" },
                    userName: { type: "string" },
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string" },
                    categoryName: { type: "string" },
                    xpLevelName: { type: "string" },
                    theme: { type: "string", enum: ["LIGHT", "DARK"] },
                },
            },
            CheckInDTO: {
                type: "object",
                required: [
                    "checkInId",
                    "answer2",
                    "answer3",
                    "answer4",
                    "checkInStatus",
                ],
                properties: {
                    checkInId: { type: "integer", format: "int64" },
                    answer2: { type: "string" },
                    answer3: { type: "string" },
                    answer4: { type: "string" },
                    comments: { type: "string" },
                    checkInStatus: {
                        type: "string",
                        enum: ["GOOD", "NEUTRAL", "BAD"],
                    },
                    createdAt: { type: "date" },
                },
            },
            TaskDTO: {
                type: "object",
                required: [
                    "taskId",
                    "taskName",
                    "taskDescription",
                    "completed",
                ],
                properties: {
                    taskId: { type: "integer", format: "int64" },
                    taskName: { type: "string" },
                    taskDescription: { type: "string" },
                    completed: { type: "boolean", default: false },
                    createdAt: { type: "date" },
                },
            },
            Category: {
                type: "object",
                required: ["categoryId", "categoryName"],
                properties: {
                    categoryId: { type: "integer", format: "int64" },
                    categoryName: { type: "string" },
                },
            },
            XpLevel: {
                type: "object",
                required: ["xpLevelId", "xpLevelname"],
                properties: {
                    xpLevelId: { type: "integer", format: "int64" },
                    xpLevelname: { type: "string" },
                },
            },
            SignInRequest: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                },
            },
            SignUpRequest: {
                type: "object",
                required: [
                    "firstName",
                    "lastName",
                    "userName",
                    "email",
                    "password",
                    "categoryId",
                    "xpLevelId",
                ],
                properties: {
                    userName: { type: "string" },
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    categoryId: { type: "integer", format: "int64" },
                    xpLevelId: { type: "integer", format: "int64" },
                },
            },
            RefreshTokenRequest: {
                type: "object",
                required: ["refreshToken"],
                properties: { refreshToken: { type: "string" } },
            },
            AuthResponse: {
                type: "object",
                required: ["accessToken", "refreshToken"],
                properties: {
                    accessToken: { type: "string" },
                    refreshToken: { type: "string" },
                },
            },
            RefreshTokenResponse: {
                type: "object",
                required: ["accessToken"],
                properties: { accessToken: { type: "string" } },
            },
            VerifyEmailRequest: {
                type: "object",
                required: ["email", "code"],
                properties: {
                    email: { type: "string" },
                    code: { type: "string" },
                },
            },
            ForgotPasswordRequest: {
                type: "object",
                required: ["email"],
                properties: { email: { type: "string" } },
            },
            ResetPasswordRequest: {
                type: "object",
                required: ["email", "password", "repeatPassword", "code"],
                properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                    repeatPassword: { type: "string" },
                    code: { type: "string" },
                },
            },
            DeleteUserRequest: {
                type: "object",
                required: ["userName"],
                properties: { userName: { type: "string" } },
            },
            ChangePasswordRequest: {
                type: "object",
                required: [
                    "email",
                    "oldPassword",
                    "newPassword",
                    "repeatPassword",
                ],
                properties: {
                    email: { type: "string" },
                    oldPassword: { type: "string" },
                    newPassword: { type: "string" },
                    repeatPassword: { type: "string" },
                },
            },
            ChangeThemeRequest: {
                type: "object",
                required: ["theme"],
                properties: {
                    theme: {
                        type: "string",
                        enum: ["LIGHT", "DARK"],
                    },
                },
            },
            CreateCheckInRequest: {
                type: "object",
                required: ["answer2", "answer3", "answer4"],
                properties: {
                    answer2: { type: "string" },
                    answer3: { type: "string" },
                    answer4: { type: "string" },
                    comments: { type: "string" },
                    checkInStatus: {
                        type: "string",
                        enum: ["GOOD", "NEUTRAL", "BAD"],
                    },
                },
            },
            CreateTaskRequest: {
                type: "object",
                required: ["taskName", "taskDescription"],
                properties: {
                    taskName: { type: "string" },
                    taskDescription: { type: "string" },
                },
            },
            UpdateTaskRequest: {
                type: "object",
                required: ["taskName", "taskDescription", "completed"],
                properties: {
                    taskName: { type: "string" },
                    taskDescription: { type: "string" },
                    completed: { type: "boolean", default: false },
                },
            },
            UpdateTaskCompletedStatusRequest: {
                type: "object",
                required: ["completed"],
                properties: { completed: { type: "boolean", default: false } },
            },
            ErrorResponse: {
                type: "object",
                required: ["error"],
                properties: { error: { type: "string" } },
            },
            Created: { description: "Created" },
            NoContent: { description: "NoContent" },
            BadRequest: {
                description: "BadRequest",
                schema: { $ref: "#/definitions/ErrorResponse" },
            },
            Unauthorized: {
                description: "Unauthorized",
                schema: { $ref: "#/definitions/ErrorResponse" },
            },
            Forbidden: {
                description: "Forbidden",
                schema: { $ref: "#/definitions/ErrorResponse" },
            },
            NotFound: {
                description: "NotFound",
                schema: { $ref: "#/definitions/ErrorResponse" },
            },
            InternalServerError: {
                description: "InternalServerError",
                schema: { $ref: "#/definitions/ErrorResponse" },
            },
        },
    },
    apis: [path.join(process.cwd(), "src", "controller", "*.*(js|ts) ")],
});
