import { prisma } from "../src/util/prisma";
import { cryptUtil } from "../src/util/crypt-util";

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
    // Users and Tasks
    const users: DummyUser[] = [
        {
            firstName: "Alice",
            lastName: "Smith",
            userName: "alice",
            email: "alice@example.com",
            password: "password",
            categoryId: 1,
            xpLevelId: 1,
            tasks: [
                {
                    taskName: "Study for midterms",
                    taskDescription:
                        "Study for midterms in the next week. Make sure to study for all the subjects.",
                },
                {
                    taskName: "Watch intro to Git and Github",
                    taskDescription: "Watch the intro to Git and Github video.",
                },
                {
                    taskName: "Enroll in Spring classes",
                    taskDescription:
                        "Enroll in Spring classes on the university website.",
                },
            ],
        },
        {
            firstName: "Bob",
            lastName: "Smith",
            userName: "bob",
            email: "bob@exmaple.com",
            password: "password",
            categoryId: 2,
            xpLevelId: 1,
            tasks: [],
        },
        {
            firstName: "Charlie",
            lastName: "Smith",
            userName: "charlie",
            email: "charlie@example.com",
            password: "password",
            categoryId: 3,
            xpLevelId: 1,
            tasks: [],
        },
    ];
    for (const user of users) {
        const hashedPassword = await cryptUtil.hash(user.password);
        await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
                tasks: {
                    createMany: {
                        data: user.tasks,
                    },
                },
            },
        });
    }
}

type DummyTask = {
    taskName: string;
    taskDescription: string;
};

type DummyUser = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    categoryId: number;
    xpLevelId: number;
    tasks: DummyTask[];
};

init()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
