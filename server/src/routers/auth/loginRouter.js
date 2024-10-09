import express from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../../models/user-model.js';
import { logger } from '../../common/logger.js';
import { ApiError } from '../../common/api-error.js';
import { env } from "../../common/env.js";


export const loginRouter = express.Router();


const ACCESS_TOKEN_SECRET = env("ACCESS_TOKEN_SECRET");


loginRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ApiError(404, 'User not found.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(400, 'Incorrect password.');
    }
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    logger.info('User logged in', { email });
    res.json({ message: 'Logged in successfully', token: 'Bearer ' + token });
  } catch (error) {
    logger.error('Error logging in', error);
    next(error instanceof ApiError ? error : new ApiError(500, 'Error logging in.'));
  }
});
