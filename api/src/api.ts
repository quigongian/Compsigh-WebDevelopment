import { Request, Response, Router } from "express";
import { json } from "body-parser";
import cors from "cors";
import errorHandler from "./util/errorHandler";
import taskService from "./service/taskService";

const api = Router();

api.use(json());
api.use(cors());

function notImplemented(req: Request, res: Response) {
    throw new Error("Not implemented");
}

api.get("/ping", (req: Request, res: Response) => {
    res.json({ message: "pong" });
});

api.post("/auth/signin", notImplemented);
api.post("/auth/signup", notImplemented);
api.post("/auth/forgotpassword", notImplemented);

api.get("/category", notImplemented);
api.get("/xplevel", notImplemented);

api.get("/user", notImplemented);
api.get("/user/:userId", notImplemented);

api.get("/user/:userId/task", taskService.getAllTasks); // /api/user/:userId/task?completed=[true|false] else all
api.get("/user/:userId/task/:taskId", taskService.getTask);
api.post("/user/:userId/task", taskService.createTask);
api.put("/user/:userId/task/:taskId", taskService.updateTask);
api.put("/user/:userId/task/:taskId/complete", taskService.completeTask);
api.delete("/user/:userId/task/:taskId", taskService.deleteTask);

api.use(errorHandler);

export default api;
