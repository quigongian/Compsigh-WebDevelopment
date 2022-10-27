import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function init() {
    const categories = await prisma.category.createMany({
        data: [
            { category_name: "Software Engineering" },
            { category_name: "Web Development" },
            { category_name: "Mobile Development" },
            { category_name: "Data Science" },
            { category_name: "Machine Learning" },
            { category_name: "Artificial Intelligence" },
            { category_name: "UI/UX" },
        ],
    });
    console.log(categories);

    const xplevels = await prisma.xpLevel.createMany({
        data: [
            { xpLevel_name: "Beginner" },
            { xpLevel_name: "Intermediate" },
            { xpLevel_name: "Advanced" },
        ],
    });
    console.log(xplevels);

    const users = await prisma.user.createMany({
        data: [
            {
                firstName: "Alice",
                lastName: "Smith",
                userName: "alice",
                email: "alice@example.com",
                password: "password",
                category_id: 1,
                xpLevel_id: 1,
            },
            {
                firstName: "Bob",
                lastName: "Smith",
                userName: "bob",
                email: "bob@exmaple.com",
                password: "password",
                category_id: 2,
                xpLevel_id: 1,
            },
            {
                firstName: "Charlie",
                lastName: "Smith",
                userName: "charlie",
                email: "charlie@example.com",
                password: "password",
                category_id: 3,
                xpLevel_id: 1,
            },
        ],
    });
    console.log(users);
}

init()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
