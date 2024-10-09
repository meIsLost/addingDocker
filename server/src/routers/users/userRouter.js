import jwt from "jsonwebtoken";
import express from "express";
import { userModel, userSchemaValidator } from "../../models/user-model.js";
import { connect, disconnect } from "../../databases/connection.js";
import { logger } from "../../common/logger.js";
import { ApiError } from "../../common/api-error.js";
import { getEmailFromParams } from "./lib/get-email.js";
import { env } from "../../common/env.js";

export const userRouter = express.Router();

const ACCESS_TOKEN_SECRET = env("ACCESS_TOKEN_SECRET");

userRouter.get("/users", async (_req, res, next) => {
  try {
    await connect();
    const users = await userModel.find();

    logger.info("getAllUsers", { users });

    res.json(users);
  } catch (error) {
    logger.error("getAllUsers", { error });
    next();
  } finally {
    await disconnect();
  }
});

userRouter.get("/users/:email", async (req, res, next) => {
  try {
    const email = getEmailFromParams(req, res);

    await connect();
    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      logger.error("getUserByEmail", "User not found", { email });
      throw new ApiError(404, "User was not found.");
    }

    res.json(user);
  } catch (error) {
    logger.error("getUserByEmail", { error });
    next(new ApiError(500, "Error getting user"));
  } finally {
    await disconnect();
  }
});

userRouter.post("/users", async (req, res, next) => {
  try {
    /*** @type {import("../../models/types.js").User} */
    let body;
    try {
      body = userSchemaValidator.parse(req.body);
    } catch (error) {
      throw new ApiError(400, error);
    }

    await connect();

    const existingUser = await userModel.findOne({ email: body.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await userModel.create(body);

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
    );

    logger.info("User created and logged in", { email: newUser.email });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Don't use Secure in development (HTTP)
      sameSite: "Lax", // Use 'Lax' to allow cookies in first-party contexts
      maxAge: 3600 * 1000, // 1 hour expiration
    });
    res
      .status(201)
      .json({ message: "User registered", token: "Bearer " + token });
  } catch (error) {
    logger.error("createUser", { error });
    if (error instanceof ApiError) {
      return next(error);
    }

    next(new ApiError(500, "Error creating user", error));
  } finally {
    await disconnect();
  }
});

userRouter.delete("/users/:email", async (req, res, next) => {
  try {
    const email = getEmailFromParams(req, res);

    await connect();
    const { deletedCount } = await userModel.deleteOne({ where: { email } });

    if (deletedCount === 0) {
      logger.error("deleteUser", "User not found", { email });
      throw new ApiError(404, "User was not found.");
    }
    logger.info("deleteUser", { email });
    res.json({ message: "User deleted" });
  } catch (error) {
    logger.error("deleteUser", { error });
    if (error instanceof ApiError) {
      next(error);
    }

    next(new ApiError(500, "Error deleting user"));
  } finally {
    await disconnect();
  }
});
