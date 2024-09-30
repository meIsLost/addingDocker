import { type InferSchemaType } from "mongoose";
import { type destinationSchema } from "./destination-model";
import { type userSchema } from "./user-model";

export type Destination = InferSchemaType<typeof destinationSchema>;
export type User = InferSchemaType<typeof userSchema>;
