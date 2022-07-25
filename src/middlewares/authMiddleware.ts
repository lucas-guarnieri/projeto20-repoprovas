import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) throw { type: "unauthorized", message: "missing token" };
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.tokenData = tokenData;
    next();
}