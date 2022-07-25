import express, { json } from "express";
import "express-async-errors";

import { errorHandlerMiddleware } from "./middlewares/errorMiddleware.js";
import router from "./routes/index.js";

const app = express();
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;