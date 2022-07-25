import { Router } from "express";

import { createTest } from "../controllers/testController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/test", validateToken, validateSchemaMiddleware(testSchema), createTest);

export default testRouter;