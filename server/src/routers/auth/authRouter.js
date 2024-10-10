import express from "express";
import jwt from "jsonwebtoken";
import { loginSchemaValidator, userModel } from "../../models/user-model.js";
import { logger } from "../../common/logger.js";
import { ApiError } from "../../common/api-error.js";
import { env } from "../../common/env.js";
import { connect, disconnect } from "../../databases/connection.js";
import { comparePasswords } from "./lib/compare-passwords.js";

export const authRouter = express.Router();

const ACCESS_TOKEN_SECRET = env("ACCESS_TOKEN_SECRET");

authRouter.post("/login", async (req, res, next) => {
  try {
    /**
     * @type {{ email: string, password: string}}
     */
    let body;
    try {
      body = loginSchemaValidator.parse(req.body);
    } catch (error) {
      throw new ApiError(400, error);
    }

    await connect();
    const { email, password } = body;

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ApiError(418, "Auth error");
    }

    /** @type {boolean} */
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw new ApiError(418, "Auth error");
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    logger.info("User logged in", { email });

    res.cookie("authToken", token, {
      secure: true,
      sameSite: "Lax",
      maxAge: 3600 * 1000, // 1 hour expiration
    });

    res.json({ message: "Logged in successfully", token: "Bearer " + token });
  } catch (error) {
    logger.error("Error logging in", error);

    if (error instanceof ApiError) {
      return next(error);
    }

    next(new ApiError(500, "Internal server error"));
  } finally {
    await disconnect();
  }
});

authRouter.post("/logout", (req, res, next) => {
  try {
    res.clearCookie("authToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error("Error logging out", error);
    next(new ApiError(500, "Internal server error"));
  }
});
