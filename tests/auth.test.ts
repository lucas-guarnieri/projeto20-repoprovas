import supertest from 'supertest';

import app from '../src/app.js';
import { prisma } from '../src/config/database.js';
import userFactory from './factories/userFactory.js';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`
});

describe("Authorization test suite", () => {
    it("given email and password, sign-up user", async () => {
        const login = userFactory.createLogin();
        const res = await supertest(app).post(`/sign-up`).send(login);
        expect(res.status).toBe(201);

        const user = await prisma.user.findFirst({
            where: { email: login.email }
        });
        expect(user.email).toBe(login.email);
    });

    it("given email already in use, fail to signup", async () => {
        const login = userFactory.createLogin();
        await userFactory.createUserOnDb(login);

        const res = await supertest(app).post(`/sign-up`).send(login);
        expect(res.status).toBe(409);
    });

    it("given invalid signup input, return 422", async () => {
        const login = userFactory.createLogin();
        delete login.email;

        const res = await supertest(app).post(`/sign-up`).send(login);
        expect(res.status).toBe(422);
    });

    it("given valid signin credentials, receive token", async () => {
        const login = userFactory.createLogin();
        const user = await userFactory.createUserOnDb(login);

        const res = await supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });
        const token = res.body.token;
        expect(token).not.toBeNull()
    });

    it("given invalid credentials(password), return 401", async () => {
        const login = userFactory.createLogin();
        const user = await userFactory.createUserOnDb(login);

        const res = await supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: "invalidpassword"
        });
        expect(res.status).toBe(401);
    });

});