import { Test } from "@prisma/client";
import testRepository from "../repositories/testRepository.js";
import checkRepository from "../repositories/checkRepository.js";

export type CreateTest = Omit<Test, "id">
export type CreateTestData = Omit<CreateTest, "teacherDisciplineId"> & { teacherId: number, disciplineId: number }

async function insertTest(testData: CreateTestData) {
    const { categoryId, disciplineId, name, pdfUrl, teacherId } = testData;
    const existingTeacher = await checkRepository.getTeacherById(teacherId);
    if (!existingTeacher) throw { type: "not_found", message: "teacher not exists" };
    const existingDisciple = await checkRepository.getDisciplineById(disciplineId);
    if (!existingDisciple) throw { type: "not_found", message: "discipline not exists" };
    const existingCategory = await checkRepository.getCategoryById(categoryId);
    if (!existingCategory) throw { type: "not_found", message: "category not exists" };
    const exisitngTeacherDiscipline = await checkRepository.getTeacherDiscipline(teacherId, disciplineId);
    if (!exisitngTeacherDiscipline) throw { type: "not_found", message: "teacher not assigned to discipline" };
    const newTestData: CreateTest = {
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId: exisitngTeacherDiscipline.id
    };
    await testRepository.insert(newTestData);
}

export default {
    insertTest,
}