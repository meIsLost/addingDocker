import { type InferSchemaType } from "mongoose";
import { type destinationSchema } from "./destination-model.js";
import { type userSchema } from "./user-model.js";

export type Destination = InferSchemaType<typeof destinationSchema>;
export type User = InferSchemaType<typeof userSchema>;
