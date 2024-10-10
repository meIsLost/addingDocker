import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

export const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
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
    username: {
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
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export const userModel = mongoose.model("user", userSchema);

export const userSchemaValidator = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1).max(20),
});

export const loginSchemaValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(20),
});
