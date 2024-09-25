import express from "express";
import cors from "cors";
import { userRouter } from "./src/routers/users/user-routes.js";
import { destinationRouter } from "./src/routers/destinations/destinationRouter.js";
import { env } from "./src/common/env.js";
import { loggerMiddleware } from "./src/middlewares/logger-middleware.js";
import { timeoutMiddleware } from "./src/middlewares/timeout-middleware.js";
import { rateLimiter } from "./src/common/rate-limit.js";
import { errorHandlerMiddleware } from "./src/middlewares/error-handler-middleware.js";

const PORT = env("PORT");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(rateLimiter);

/** Middlewares */
app.use(loggerMiddleware);
app.use(timeoutMiddleware);

/** Routers */
app.use("/v1", userRouter);
app.use("/v1", destinationRouter);

/** Error handler */
app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log("Port is running on", PORT));
