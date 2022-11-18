import { Request, Response, NextFunction } from "express";
import { categoryService } from "../service/category-service";
import { HttpStatus } from "../util/HttpStatus";

/**
 * @swagger
 *  /category:
 *    get:
 *      tags:
 *        - category
 *      summary: Get all categories
 *      responses:
 *        200:
 *          description: Ok - Returns Category[]
 *          schema:
 *            type: "array"
 *            items:
 *              $ref: "#/definitions/Category"
 *        500:
 *          $ref: '#/definitions/InternalServerError'
 */
async function getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categories = await categoryService.getAll();
        res.status(HttpStatus.Ok).json(categories);
    } catch (error) {
        next(error);
    }
}

export const categoryController = {
    getAllCategories,
};
