import express from "express";
import { userModel } from "../../models/user-model.js";
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

userRouter.post('/users', async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    await connect();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new userModel({ name, username, email, password });
    await newUser.save();

    res.status(201).json({
      message: 'User registered',
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    next(new ApiError(500, 'Error creating user', error));
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
