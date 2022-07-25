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

async function getByTeacher() {
    const tests = await prisma.teachersDisciplines.findMany({
        include: {
            teacher: {},
            discipline: {
                include: {
                    term: {}
                }
            },
            Test: {
                include: {
                    category: {},
                }
            },
        }
    });
    return tests;
}

async function getByDiscipline() {
    const tests = await prisma.term.findMany({
        include: {
            Discipline: {
                include: {
                    TeachersDisciplines: {
                        include: {
                            Test: {
                                include: {
                                    category: true,
                                },
                            },
                            teacher: true,
                        }
                    }
                }
            }
        }
    });
    return tests;
}

export default {
    findById,
    insert,
    getByTeacher,
    getByDiscipline
}