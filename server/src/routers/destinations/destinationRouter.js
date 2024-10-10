import express from "express";
import {
  destinationModel,
  destinationSchemaValidator,
  paramQueryValidator,
} from "../../models/destination-model.js";
import { logger } from "../../common/logger.js";
import { ApiError } from "../../common/api-error.js";
import { connect, disconnect } from "../../databases/connection.js";
import passport from "passport";
import { z } from "zod";

export const destinationRouter = express.Router();

destinationRouter.get("/destinations", async (req, res, next) => {
  try {
    const queryParams = paramQueryValidator.parse(req.query);
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

destinationRouter.get("/destinations/:id", async (req, res, next) => {
  try {
    try {
      var { id } = z.object({ id: z.string() }).parse(req.params);
    } catch (error) {
      throw new ApiError(400, error);
    }

    await connect();
    const destination = await destinationModel.findById(id);
    if (!destination) {
      throw new ApiError(404, "Destination not found");
    }

    res.json(destination);
  } catch (error) {
    logger.error("Error retrieving destination", error);

    if (error instanceof ApiError) {
      return next(error);
    }

    next(new ApiError(500, "Error retrieving destination"));
  } finally {
    await disconnect();
  }
});

destinationRouter.post("/destinations", async (req, res, next) => {
  try {
    try {
      var body = destinationSchemaValidator.parse(req.body);
    } catch (error) {
      throw new ApiError(400, error);
    }

    await connect();

    const newDestination = await destinationModel.create({ ...body });

    logger.info("Destination created: ", newDestination);
    res.status(201).json({
      message: "Destination created successfully",
      destination: newDestination,
    });
  } catch (error) {
    logger.error("Error creating destination", error);
    next(new ApiError(500, "Error creating destination"));
  } finally {
    await disconnect();
  }
});

destinationRouter.put(
  "/destinations/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await connect();
      try {
        var { id } = z.object({ id: z.string() }).parse(req.params);
        var validatedData = z
          .object(destinationSchemaValidator.shape)
          .partial()
          .parse(req.body);
      } catch (error) {
        throw new ApiError(400, error);
      }

      const destination = await destinationModel.findByIdAndUpdate(
        id,
        validatedData,
        { new: true },
      );

      if (!destination) {
        throw new ApiError(404, "Destination not found");
      }

      logger.info("Destination updated: ", destination);
      res.json({
        message: "Destination updated successfully",
        destination,
      });
    } catch (error) {
      logger.error("Error updating destination", error);

      if (error instanceof ApiError) {
        return next(error);
      }

      next(new ApiError(500, "Error updating destination"));
    } finally {
      await disconnect();
    }
  },
);

destinationRouter.delete(
  "/destinations/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      try {
        var { id } = z.object({ id: z.string() }).parse(req.params);
      } catch (error) {
        throw new ApiError(400, error);
      }

      await connect();
      const destination = await destinationModel.findByIdAndDelete(id);
      if (!destination) {
        throw new ApiError(404, "Destination not found");
      }
      res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
      logger.error("Error deleting destination", error);

      if (error instanceof ApiError) {
        return next(error);
      }

      next(new ApiError(500, "Error deleting destination"));
    } finally {
      await disconnect();
    }
  },
);
