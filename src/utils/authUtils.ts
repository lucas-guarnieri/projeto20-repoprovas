import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function passwordEncryption(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return encryptedPassword;
}

async function validatePassword(password: string, encryptedPassword: string) {
    const validPassword = bcrypt.compareSync(password, encryptedPassword);
    if (!validPassword) throw { type: "unauthorized", message: "login authorization problem" };
}

function setToken(userId: number) {
    const tokenData = { userId };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);
    return token;
}

export default {
    passwordEncryption,
    validatePassword,
    setToken,
}