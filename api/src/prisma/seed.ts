import { prisma } from "../util/prisma";
import { authService } from "../service/auth-service";
import { SignUpRequest } from "../models/requests";

async function init() {
    // Categories
    await prisma.category.createMany({
        data: [
            { categoryName: "Software Engineering" },
            { categoryName: "Web Development" },
            { categoryName: "Mobile Development" },
            { categoryName: "Data Science" },
            { categoryName: "AI/ML" },
            { categoryName: "UI/UX" },
        ],
    });
    // XpLevels
    await prisma.xpLevel.createMany({
        data: [
            { xpLevelName: "Beginner" },
            { xpLevelName: "Intermediate" },
            { xpLevelName: "Advanced" },
        ],
    });
    // GeneratedTasks
    await prisma.generatedTask.create({
        data: {
            generatedTaskName: "Learn Data Structures and Algorithms",
            generatedTaskDescription:
                "Introduction to Data Structures and Algorithms",
            categories: {
                connect: [
                    { categoryName: "Software Engineering" },
                    { categoryName: "Web Development" },
                    { categoryName: "Mobile Development" },
                    { categoryName: "Data Science" },
                    { categoryName: "AI/ML" },
                ],
            },
            xpLevelId: 1,
        },
    });
    await prisma.generatedTask.create({
        data: {
            generatedTaskName: "Learn Git and Github",
            generatedTaskDescription: "Introduction to Git and Github",
            categories: {
                connect: [
                    { categoryName: "Software Engineering" },
                    { categoryName: "Web Development" },
                    { categoryName: "Mobile Development" },
                    { categoryName: "Data Science" },
                    { categoryName: "AI/ML" },
                ],
            },
            xpLevelId: 1,
        },
    });
    await prisma.generatedTask.create({
        data: {
            generatedTaskName: "Learn React",
            generatedTaskDescription: "Introduction to React",
            categories: {
                connect: [
                    { categoryName: "Web Development" },
                    { categoryName: "UI/UX" },
                ],
            },
            xpLevelId: 1,
        },
    });
    await prisma.generatedTask.create({
        data: {
            generatedTaskName: "Learn Figma",
            generatedTaskDescription: "Introduction to Figma",
            categories: {
                connect: [
                    { categoryName: "Web Development" },
                    { categoryName: "UI/UX" },
                ],
            },
            xpLevelId: 1,
        },
    });
    await prisma.generatedTask.create({
        data: {
            generatedTaskName: "Learn SQL",
            generatedTaskDescription: "Introduction to SQL",
            categories: {
                connect: [
                    { categoryName: "Software Engineering" },
                    { categoryName: "Web Development" },
                    { categoryName: "Mobile Development" },
                    { categoryName: "Data Science" },
                    { categoryName: "AI/ML" },
                ],
            },
            xpLevelId: 1,
        },
    });
    await prisma.generatedTask.create({
        data: {
            generatedTaskName: "Learn Python",
            generatedTaskDescription: "Introduction to Python",
            categories: {
                connect: [
                    { categoryName: "Software Engineering" },
                    { categoryName: "Web Development" },
                    { categoryName: "Data Science" },
                    { categoryName: "AI/ML" },
                ],
            },
            xpLevelId: 1,
        },
    });
    await prisma.generatedTask.create({
        data: {
            generatedTaskName: "Learn Java",
            generatedTaskDescription: "Introduction to Java",
            categories: {
                connect: [
                    { categoryName: "Software Engineering" },
                    { categoryName: "Mobile Development" },
                ],
            },
            xpLevelId: 1,
        },
    });
    // Users
    const dummyUser: SignUpRequest = {
        firstName: "Dummy",
        lastName: "User",
        userName: "dummy",
        email: "dummy@example.com",
        password: "Dummy123!",
        categoryId: 1,
        xpLevelId: 1,
    };
    await authService.signUp(dummyUser);
    await prisma.user.update({
        where: { email: dummyUser.email },
        data: { emailVerified: true },
    });
}

init()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
