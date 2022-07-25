import { Router } from "express";
import { createUser, login } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { signupSchema } from "../schemas/signupSchema.js";
import { loginSchema } from "../schemas/loginSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(signupSchema), createUser);
authRouter.post("/sign-in", validateSchemaMiddleware(loginSchema), login);

export default authRouter;