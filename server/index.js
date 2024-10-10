import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import initializePassport from "./src/middlewares/passport-middleware.js";
import { userRouter } from "./src/routers/users/userRouter.js";
import { destinationRouter } from "./src/routers/destinations/destinationRouter.js";
import { authRouter } from "./src/routers/auth/authRouter.js";
import { env } from "./src/common/env.js";
import { loggerMiddleware } from "./src/middlewares/logger-middleware.js";
import { timeoutMiddleware } from "./src/middlewares/timeout-middleware.js";
import { rateLimiter } from "./src/common/rate-limit.js";
import { errorHandlerMiddleware } from "./src/middlewares/error-handler-middleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mkcert from "mkcert";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = env("PORT");
const app = express();

const ca = await mkcert.createCA({
  organization: "LMAO",
  countryCode: "US",
  state: "California",
  locality: "San Francisco",
  validity: 365,
});
const cert = await mkcert.createCert({
  domains: ["localhost"],
  validity: 365,
  ca,
});

app.use(cors({ origin: "https://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "/uploads")),
  (req, res, next) => {
    console.log("Serving files from: ", path.join(__dirname, "/uploads"));
    next();
  },
);
initializePassport(passport);
app.use(passport.initialize());

/** Routers */
app.use("/v1", userRouter);
app.use("/v1", destinationRouter);
app.use("/v1", authRouter);

/** Middlewares */
app.use(errorHandlerMiddleware);
app.use(loggerMiddleware);
app.use(timeoutMiddleware);

https
  .createServer(
    {
      key: cert.key,
      cert: cert.cert,
    },
    app,
  )
  .listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
  });
