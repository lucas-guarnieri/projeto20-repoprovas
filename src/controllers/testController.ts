import { Request, Response } from "express";

import testService from "../services/testService.js";
import { CreateTestData } from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
    const { categoryId, disciplineId, name, pdfUrl, teacherId } = req.body;
    const testData: CreateTestData = { name, pdfUrl, categoryId, teacherId, disciplineId };
    await testService.insertTest(testData);
    res.sendStatus(201);
}