import { prisma } from "../config/database.js";
import { CreateTest } from "../services/testService.js";

async function findById(testId: number) {
    return prisma.test.findUnique({
        where: { id: testId }
    });
}

async function insert(createTestData: CreateTest) {
    await prisma.test.create({
        data: createTestData,
    });
}

export default {
    findById,
    insert
}