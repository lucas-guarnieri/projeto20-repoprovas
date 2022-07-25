import { Request, Response } from "express";

import userService from "../services/userService.js";
import authUtils from "../utils/authUtils.js";
import { CreateUserData, LoginData } from "../services/userService.js";

export async function createUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const passwordHash = await authUtils.passwordEncryption(password);
    const userData: CreateUserData = {
        email,
        password: passwordHash
    }
    await userService.insertUser(userData);
    res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
    const loginData: LoginData = req.body;
    const token = await userService.userLogin(loginData);
    res.status(200).send({ token });
}