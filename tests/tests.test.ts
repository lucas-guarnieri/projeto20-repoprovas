import supertest from 'supertest';

import app from '../src/app.js';
import { prisma } from '../src/config/database.js';
import userFactory from './factories/userFactory.js';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`

});

describe("Tests test suite", () => {
    it("given valid data, create test", async () => {
        const token = await performLogin();

        const testData = {
            name: "Test 1",
            pdfUrl: "fakelink.com",
            categoryId: 1,
            teacherId: 1,
            disciplineId: 1
        };

        const res = await supertest(app).post("/test").send(testData).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(201);

        const createdTest = await prisma.test.findFirst({
            where: { name: testData.name }
        });
        expect(createdTest).not.toBeNull();
    });
    it("given invalid teacherId, return 404", async () => {
        const token = await performLogin();

        const testData = {
            name: "Test 1",
            pdfUrl: "fakelink.com",
            categoryId: 1,
            teacherId: 1000,
            disciplineId: 1
        };

        const res = await supertest(app).post("/test").send(testData).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
    });
    it("given invalid disciplineId, return 404", async () => {
        const token = await performLogin();

        const testData = {
            name: "Test 1",
            pdfUrl: "fakelink.com",
            categoryId: 1,
            teacherId: 1,
            disciplineId: 1000
        };

        const res = await supertest(app).post("/test").send(testData).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
    });
    it("given invalid categoryId, return 404", async () => {
        const token = await performLogin();

        const testData = {
            name: "Test 1",
            pdfUrl: "fakelink.com",
            categoryId: 1000,
            teacherId: 1,
            disciplineId: 1
        };

        const res = await supertest(app).post("/test").send(testData).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
    });
    it("given invalid combination teacher/discipline, return 404", async () => {
        const token = await performLogin();

        const testData = {
            name: "Test 1",
            pdfUrl: "fakelink.com",
            categoryId: 1,
            teacherId: 1,
            disciplineId: 4
        };

        const res = await supertest(app).post("/test").send(testData).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(401);
    });
    it("given invalid test input, return 422", async () => {
        const token = await performLogin();

        const testData = {
            name: "Test 1",
            pdfUrl: "fakelink.com",
            categoryId: 1,
            teacherId: 1,
        };

        const res = await supertest(app).post("/test").send(testData).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(422);
    });

    it("get tests group by disciplines", async () => {
        const res = await supertest(app).get("/test?groupBy=disciplines");
        expect(res.status).toBe(200);
        const tests = res.body.texts;
        expect(tests).not.toBeNull();
    });

    it("get tests group by teachers", async () => {
        const res = await supertest(app).get("/test?groupBy=teachers");
        expect(res.status).toBe(200);
        const tests = res.body.texts;
        expect(tests).not.toBeNull();
    });

    it("given invalid query for test route, return 400", async () => {
        const res = await supertest(app).get("/test?groupBy=invalid");
        expect(res.status).toBe(400);
    });

})

async function performLogin() {
    const login = userFactory.createLogin();
    const user = await userFactory.createUserOnDb(login);
    const resLogin = await supertest(app).post(`/sign-in`).send({
        email: user.email,
        password: user.plainPassword
    });
    return resLogin.body.token;
}