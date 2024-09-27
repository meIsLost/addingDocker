import express from "express";
import {
  destinationModel,
  destinationSchemaValidator,
} from "../../models/destination-model.js";
import { logger } from "../../common/logger.js";
import { ApiError } from "../../common/api-error.js";
import { connect, disconnect } from "../../databases/connection.js";

export const destinationRouter = express.Router();

destinationRouter.get("/destinations", async (_req, res, next) => {
  try {
    await connect();
    const destinations = await destinationModel.find();

    logger.info("getAllDestinations: ", destinations);
    res.json(destinations);
  } catch (error) {
    logger.error("Error retrieving destinations", { error });
    next(new ApiError(500, "Error retrieving destinations"));
  }
});

destinationRouter.post("/destinations", async (req, res, next) => {
  try {
    const body = destinationSchemaValidator.parse(req.body);
    await connect();
    const newDestination = await destinationModel.create(body);

    logger.info("destinationModel create", newDestination);
    res.status(201).json({ message: "Created", destination: newDestination });
  } catch (error) {
    logger.error("Error creating destination", { error });
    next(new ApiError(500, "Error creating destination"));
  } finally {
    await disconnect();
  }
});
