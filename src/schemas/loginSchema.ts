import Joi from "joi";
import { LoginData } from "../services/userService"

export const loginSchema = Joi.object<LoginData>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});