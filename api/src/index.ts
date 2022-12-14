import express, { Router } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { healthCheckController } from "./controller/healthcheck-controller";
import { categoryController } from "./controller/category-controller";
import { xpLevelController } from "./controller/xp-level-controller";
import { authController } from "./controller/auth-controller";
import { userController } from "./controller/user-controller";
import { checkInController } from "./controller/check-in-controller";
import { taskController } from "./controller/task-controller";
import { loggerMiddleware } from "./middleware/logger-middleware";
import { notFoundHandler } from "./middleware/not-found-middleware";
import { globalErrorHandler } from "./middleware/error-middleware";
import { AUTH } from "./middleware/auth-middleware";
import { envVars } from "./util/env-vars";
import scheduleTasks from "./tasks/schedule-tasks";

const app = express();
const api = Router();
const PORT = Number(envVars.PORT);

api.use(cors());
api.use(express.json());
api.use("/docs", swaggerUI.serve);
api.get("/docs", swaggerUI.setup(swaggerSpec));
api.get("/ping", healthCheckController.ping);
api.get("/category", categoryController.getAllCategories);
api.get("/xplevel", xpLevelController.getAllXpLevels);
api.post("/auth/signin", authController.signIn);
api.post("/auth/signup", authController.signUp);
api.post("/auth/refresh", AUTH(authController.refreshAccessToken));
api.post("/auth/email/verify", authController.verifyEmail);
api.post("/auth/password/forgot", authController.forgotPassword);
api.post("/auth/password/reset", authController.resetPassword);
api.get("/user/", AUTH(userController.getUser));
api.delete("/user/:email", AUTH(userController.deleteAccount));
api.patch("/user/password", AUTH(userController.updatePassword));
api.post("/user/email", AUTH(userController.changeEmail));
api.patch("/user/email", AUTH(userController.updateEmail));
api.patch("/user/theme", AUTH(userController.changeTheme));
api.get("/checkin", AUTH(checkInController.getPaginatedCheckIns));
api.post("/checkin", AUTH(checkInController.makeCheckIn));
api.get("/checkin/:checkInId", AUTH(checkInController.getCheckIn));
api.get("/task", AUTH(taskController.getAllTasks));
api.post("/task", AUTH(taskController.createTask));
api.get("/task/:taskId", AUTH(taskController.getTask));
api.put("/task/:taskId", AUTH(taskController.updateTask));
api.delete("/task/:taskId", AUTH(taskController.deleteTask));
api.patch("/task/:taskId/complete", AUTH(taskController.updateCompletedStatus));

app.use(loggerMiddleware);
app.use("/api/v1", api);
app.use("*", notFoundHandler);
app.use(globalErrorHandler);

app.disable("etag");

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api/v1/docs`);
    scheduleTasks();
});
