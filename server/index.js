import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import initializePassport from "./src/middlewares/passport-middleware.js";
import { userRouter } from "./src/routers/users/userRouter.js";
import { destinationRouter } from "./src/routers/destinations/destinationRouter.js";
import { loginRouter } from "./src/routers/auth/loginRouter.js";
import { env } from "./src/common/env.js";
import { loggerMiddleware } from "./src/middlewares/logger-middleware.js";
import { timeoutMiddleware } from "./src/middlewares/timeout-middleware.js";
import { rateLimiter } from "./src/common/rate-limit.js";
import { errorHandlerMiddleware } from "./src/middlewares/error-handler-middleware.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = env("PORT");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')), (req, res, next) => {
  console.log('Serving files from: ', path.join(__dirname, '/uploads'));
  next();
});
initializePassport(passport);
app.use(passport.initialize());

/** Routers */
app.use("/v1", userRouter);
app.use("/v1", destinationRouter);
app.use("/v1", loginRouter);

/** Middlawares */
app.use(errorHandlerMiddleware);
app.use(loggerMiddleware);
app.use(timeoutMiddleware);

app.listen(PORT, () => console.log("Port is running on", PORT));
