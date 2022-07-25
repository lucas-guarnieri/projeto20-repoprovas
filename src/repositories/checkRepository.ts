import { prisma } from "../config/database.js";

async function getTeacherById(teacherId: number) {
    return prisma.teacher.findUnique({
        where: { id: teacherId }
    });
}

async function getDisciplineById(disciplineId: number) {
    return prisma.discipline.findUnique({
        where: { id: disciplineId }
    });
}

async function getCategoryById(categoryId: number) {
    return prisma.category.findUnique({
        where: { id: categoryId }
    });
}

async function getTeacherDiscipline(teacherId: number, disciplineId: number) {
    return prisma.teachersDisciplines.findFirst({
        where: { teacherId, disciplineId }
    });
}

export default {
    getTeacherById,
    getDisciplineById,
    getCategoryById,
    getTeacherDiscipline
}