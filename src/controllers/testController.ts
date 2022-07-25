import { Request, Response } from "express";

import testService from "../services/testService.js";
import { CreateTestData } from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
    const { categoryId, disciplineId, name, pdfUrl, teacherId } = req.body;
    const testData: CreateTestData = { name, pdfUrl, categoryId, teacherId, disciplineId };
    await testService.insertTest(testData);
    res.sendStatus(201);
}

export async function getTest(req: Request, res: Response) {
    const { groupBy } = req.query;
    if (groupBy === "teachers") {
        const tests = await testService.getTestByTeacher();
        return res.status(200).send({ tests });
    };
    if (groupBy === "disciplines") {
        const tests = await testService.getTestByDiscipline();
        return res.status(200).send({ tests });
    } else {
        throw { type: "bad_request", message: "bad query" };
    }
}