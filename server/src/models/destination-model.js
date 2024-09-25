import mongoose from "mongoose";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const destinationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
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
  },
  country: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export const destinationModel = mongoose.model(
  "destination",
  destinationSchema,
);

export const destinationSchemaValidator = z.object({
  title: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().min(1),
  location: z.string().min(1),
  country: z.string().min(1),
  imageUrl: z.string().min(1),
});
