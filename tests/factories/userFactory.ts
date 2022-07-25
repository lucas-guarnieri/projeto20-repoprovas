import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';

import { prisma } from "../../src/config/database.js";


function createLogin() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(10)
    }
}

interface Login { email: string, password: string };

async function createUserOnDb(login: Login) {
    const user = await prisma.user.create({
        data: {
            email: login.email,
            password: bcrypt.hashSync(login.password, 12)
        }
    });

    return { ...user, plainPassword: login.password };
}

const userFactory = {
    createLogin,
    createUserOnDb
}

export default userFactory;