import express from "express";
import {
  destinationModel,
  destinationSchemaValidator,
  paramQueryValidator,
} from "../../models/destination-model.js";
import { logger } from "../../common/logger.js";
import { ApiError } from "../../common/api-error.js";
import { connect, disconnect } from "../../databases/connection.js";

export const destinationRouter = express.Router();

destinationRouter.get("/destinations", async (_req, res, next) => {
  try {
    const queryParams = paramQueryValidator.parse(_req.query);
    await connect();
    let destinations = [];
    console.time();
    if (queryParams.location || queryParams.country || queryParams.title) {
      destinations = await destinationModel
        .find(queryParams)
        .hint({ location: 1 })
        .exec();
    } else {
      destinations = await destinationModel.find();
    }
    console.timeEnd();
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

destinationRouter.delete("/destinations/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await connect();
    const deletedDestination = await destinationModel.findByIdAndDelete(id);

    if (!deletedDestination) {
      throw new ApiError(404, "Destination not found");
    }

    logger.info("destinationModel delete", deletedDestination);
    res.json({ message: "Deleted" });
  } catch (error) {
    logger.error("Error deleting destination", { error });

    if (error instanceof ApiError) {
      return next(error);
    }

    next(new ApiError(500, "Error deleting destination"));
  } finally {
    await disconnect();
  }
});
