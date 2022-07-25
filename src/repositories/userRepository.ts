import { prisma } from "../config/database.js";
import { CreateUserData } from "../services/userService.js";

async function findById(userId: number) {
    return prisma.user.findUnique({
        where: { id: userId }
    });
}

async function findByEmail(userEmail: string) {
    return prisma.user.findUnique({
        where: { email: userEmail }
    });
}

async function insert(createUserData: CreateUserData) {
    await prisma.user.create({
        data: createUserData,
    });
}

export default {
    findById,
    findByEmail,
    insert
}