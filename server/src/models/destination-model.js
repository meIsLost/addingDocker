import { createId } from "@paralleldrive/cuid2";
import mongoose from "mongoose";
import { z } from "zod";

export const destinationSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  id: {
    type: String,
    required: true,
    default: createId(),
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    index: true,
  },
  country: {
    type: String,
    required: true,
    index: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

export const destinationModel = mongoose.model(
  "destination",
  destinationSchema,
);

export const destinationSchemaValidator = z.object({
  title: z.string().min(1),
  startDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  endDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  description: z.string().min(1),
  location: z.string().min(1),
  country: z.string().min(1),
  imageUrl: z.string().optional(),
});

export const paramQueryValidator = z.object({
  country: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
});
