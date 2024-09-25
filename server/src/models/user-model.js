import mongoose from "mongoose";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: createId(),
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const userModel = mongoose.model("user", userSchema);

export const userSchemaValidator = z.object({
  name: z.string().min(1),
  userName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1).max(20),
});
