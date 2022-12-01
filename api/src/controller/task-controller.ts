import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../util/HttpStatus";
import { taskService } from "../service/task-service";

/**
 * @swagger
 *  /task:
 *    get:
 *      tags:
 *        - task
 *      summary: Get tasks by completed status
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: query
 *          name: completed
 *          type: boolean
 *          required: false
 *          description: Completed status, if not specified, ALL tasks will be returned
 *      responses:
 *        200:
 *          description: Ok - Returns TaskDTO[]
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/definitions/TaskDTO"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const tasksDTOs = await taskService.getAllTaskDTOsByCompletedStatus(
            req.userId,
            req.query.completed as string | null
        );
        res.status(HttpStatus.Ok).json(tasksDTOs);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /task:
 *    post:
 *      tags:
 *        - task
 *      summary: Create task
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: CreateTaskRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/CreateTaskRequest"
 *      responses:
 *        201:
 *          description: Created - Returns TaskDTO
 *          schema:
 *            $ref: "#/definitions/TaskDTO"
 *        400:
 *          $ref: "#/definitions/BadRequest"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const createdTaskDTO = await taskService.createAndReturnTaskDTO({
            userId: req.userId,
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
        });
        res.status(HttpStatus.Created).json(createdTaskDTO);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /task/{taskId}:
 *    get:
 *      tags:
 *        - task
 *      summary: Get task by id
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: path
 *          name: taskId
 *          schema:
 *            type: number
 *            format: int64
 *          required: true
 *          description: taskId
 *      responses:
 *        200:
 *          description: Ok - Returns TaskDTO
 *          schema:
 *            $ref: "#/definitions/TaskDTO"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        403:
 *          $ref: "#/definitions/Forbidden"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function getTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        res.status(HttpStatus.Ok).json(taskDTO);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /task/{taskId}:
 *    put:
 *      tags:
 *        - task
 *      summary: Update task
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: path
 *          name: taskId
 *          schema:
 *            type: number
 *            format: int64
 *          required: true
 *          description: taskId
 *        - in: body
 *          name: body
 *          description: UpdateTaskRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/UpdateTaskRequest"
 *      responses:
 *        200:
 *          description: Ok - Returns TaskDTO
 *          schema:
 *            $ref: "#/definitions/TaskDTO"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        403:
 *          $ref: "#/definitions/Forbidden"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        const updatedTaskDTO = await taskService.updateAndReturnTaskDTO({
            taskId: taskDTO.taskId,
            taskName: req.body.taskName,
            completed: req.body.completed,
            taskDescription: req.body.taskDescription,
        });
        res.status(HttpStatus.Ok).json(updatedTaskDTO);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /task/{taskId}:
 *    delete:
 *      tags:
 *        - task
 *      summary: Delete task"
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: path
 *          name: taskId
 *          schema:
 *            type: number
 *            format: int64
 *          required: true
 *          description: taskId
 *      responses:
 *        204:
 *          $ref: "#/definitions/NoContent"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        403:
 *          $ref: "#/definitions/Forbidden"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        await taskService.deleteById(taskDTO.taskId);
        res.sendStatus(HttpStatus.NoContent);
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 *  /task/{taskId}/complete:
 *    patch:
 *      tags:
 *        - task
 *      summary: Update task completed status
 *      security:
 *        - JWT: []
 *      parameters:
 *        - in: path
 *          name: taskId
 *          schema:
 *            type: number
 *            format: int64
 *          required: true
 *          description: taskId
 *        - in: body
 *          name: body
 *          description: UpdateTaskCompletedStatusRequest
 *          required: true
 *          schema:
 *            $ref: "#/definitions/UpdateTaskCompletedStatusRequest"
 *      responses:
 *        204:
 *          $ref: "#/definitions/NoContent"
 *        401:
 *          $ref: "#/definitions/Unauthorized"
 *        403:
 *          $ref: "#/definitions/Forbidden"
 *        404:
 *          $ref: "#/definitions/NotFound"
 *        500:
 *          $ref: "#/definitions/InternalServerError"
 */
async function updateCompletedStatus(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const taskDTO = await taskService.getTaskDTOIfBelongsToUser(
            req.params.taskId,
            req.userId
        );
        await taskService.updateTaskCompletedStatus(
            taskDTO.taskId,
            req.body.completed as boolean
        );
        res.sendStatus(HttpStatus.NoContent);
    } catch (error) {
        next(error);
    }
}

export const taskController = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    updateCompletedStatus,
};
