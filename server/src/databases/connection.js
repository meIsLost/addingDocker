// import { env } from "../common/env";
import mongoose from "mongoose";
import { logger } from "../common/logger.js";
import { env } from "../common/env.js";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = env("MONGO_URL");

/** @type {Promise<import('mongoose')> | undefined}*/
let pending;

/**
 * @returns {Promise<import('mongoose')>}
 */
export async function connect() {
  if (pending === undefined) {
    pending = mongoose.connect(MONGO_URL);
  }

  const client = await pending;
  logger.info("Connected to MongoDB");

  return client;
}

/**
 *
 * @returns {Promise<void>} - A promise that resolves when the connection is closed
 */
export async function disconnect() {
  if (pending !== undefined) {
    const client = await pending;
    pending = undefined;

    logger.info("Disconnecting from MongoDB");

    return client.disconnect();
  }
}
