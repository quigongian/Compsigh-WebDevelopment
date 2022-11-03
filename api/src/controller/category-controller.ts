import { Request, Response, NextFunction } from "express";
import { categoryService } from "../service/category-service";

async function getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categories = await categoryService.getAll();
        res.json(categories);
    } catch (error) {
        next(error);
    }
}

export const categoryController = {
    getAllCategories,
};
