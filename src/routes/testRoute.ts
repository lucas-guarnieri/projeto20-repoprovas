import { Router } from "express";

import { createTest, getTest } from "../controllers/testController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/test", validateToken, validateSchemaMiddleware(testSchema), createTest);
testRouter.get("/test", getTest); //query => ?groupBy= teacher or diciplines

export default testRouter;