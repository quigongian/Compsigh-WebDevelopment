import { Category } from "@prisma/client";
import { categoryRepository } from "../repository/category-repository";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function getAll(): Promise<Category[]> {
    return categoryRepository.getAll();
}

async function getById(categoryId: number): Promise<Category> {
    const category = await categoryRepository.getById(categoryId);
    if (!category) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Category not found");
    }
    return category;
}

export const categoryService = {
    getAll,
    getById,
};
