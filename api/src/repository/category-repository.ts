import { Category } from "@prisma/client";
import { prisma } from "../util/prisma";

async function getAll(): Promise<Category[]> {
    return await prisma.category.findMany();
}

async function getById(categoryId: number): Promise<Category | null> {
    return await prisma.category.findUnique({
        where: { categoryId },
    });
}

export const categoryRepository = {
    getAll,
    getById,
};
