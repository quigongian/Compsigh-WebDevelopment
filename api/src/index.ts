import express, { Router } from "express";
import path from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { authController } from "./controller/auth-controller";
import { userController } from "./controller/user-controller";
import { checkInController } from "./controller/check-in-controller";
import { taskController } from "./controller/task-controller";
import { categoryController } from "./controller/category-controller";
import { xpLevelController } from "./controller/xp-level-controller";
import { pingHandler } from "./handler/ping-handler";
import { swaggerHandler } from "./handler/swagger-handler";
import { notFoundHandler } from "./handler/not-found-handler";
import { defaultErrorHandler } from "./handler/error-handler";
import { loggerMiddleware } from "./middleware/logger-middleware";
import { AUTH } from "./middleware/auth-middleware";
import { envVars } from "./util/env-vars";
import scheduleTasks from "./tasks/schedule-tasks";

const app = express();
const api = Router();
const PORT = Number(envVars.PORT);

api.use(cors());
api.use(express.json());
api.use("/docs", swaggerUi.serve);
api.get("/docs", swaggerHandler);
api.get("/ping", pingHandler);
api.get("/category", categoryController.getAllCategories);
api.get("/xplevel", xpLevelController.getAllXpLevels);
api.post("/auth/signin", authController.signIn);
api.post("/auth/signup", authController.signUp);
api.post("/auth/forgotpassword", authController.forgotPassword);
api.post("/auth/resetpassword", authController.resetPassword);
api.post("/auth/verifyemail", authController.verifyEmail);
api.post("/auth/refreshtoken", AUTH(authController.refreshAccessToken));
api.get("/user/me", AUTH(userController.getUser));
api.get("/checkin", AUTH(checkInController.getPaginatedCheckIns));
api.get("/checkin/:checkInId", AUTH(checkInController.getCheckIn));
api.post("/checkin", AUTH(checkInController.makeCheckIn));
api.get("/task", AUTH(taskController.getAllTasks));
api.get("/task/:taskId", AUTH(taskController.getTask));
api.post("/task", AUTH(taskController.createTask));
api.put("/task/:taskId", taskController.updateTask);
api.put("/task/:taskId/complete", AUTH(taskController.completeTask));
api.delete("/task/:taskId", AUTH(taskController.deleteTask));

app.use(loggerMiddleware);
app.use("/static", express.static(path.join(__dirname, "..", "static")));
app.use("/api", api);
app.use("*", notFoundHandler);
app.use(defaultErrorHandler);

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
    scheduleTasks();
});
