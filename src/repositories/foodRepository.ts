import prisma from "../database.js";


export async function resetDatabase() {
    await prisma.$executeRaw`TRUNCATE TABLE users, meals, "usersData" RESTART IDENTITY`
}