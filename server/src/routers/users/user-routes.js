import express from "express";
import { userModel, userSchemaValidator } from "../../models/user-model.js";
import { connect, disconnect } from "../../databases/connection.js";
import { logger } from "../../common/logger.js";
import { ApiError } from "../../common/api-error.js";
import { getEmailFromParams } from "./lib/get-email.js";

export const userRouter = express.Router();

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

    logger.info("getUserByEmail", { user });
    await disconnect();
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
    const body = userSchemaValidator.parse(req.body);

    await connect();
    const existingUser = await userModel.findOne({
      where: { email: body.email },
    });

    if (existingUser) {
      logger.error("createUser", "User already exists", { email: body.email });
      throw new ApiError(400, "User already exists.");
    }

    const newUser = await userModel.create(body);

    logger.info("createUser", { newUser });
    res.json({ message: "User registered", user: newUser });
  } catch (error) {
    logger.error("createUser", { error });
    if (error instanceof ApiError) {
      next(error);
    }

    next(new ApiError(500, "Error registering user."));
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
