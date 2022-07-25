import { Router } from "express";
import authRouter from "./authRoute.js";
import testRouter from "./testRoute.js";

const router = Router();
router.use(authRouter);
router.use(testRouter);

export default router;