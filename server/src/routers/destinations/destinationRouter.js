import express from "express";
import {
  destinationModel,
  destinationSchemaValidator,
  paramQueryValidator,
} from "../../models/destination-model.js";
import { logger } from "../../common/logger.js";
import { ApiError } from "../../common/api-error.js";
import { connect, disconnect } from "../../databases/connection.js";
import upload from "../../middlewares/image-middleware.js";
import passport from "passport";
import { z } from "zod";
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

destinationRouter.post(
  "/destinations",
  upload.single("image"),
  async (req, res, next) => {
    try {
      await connect();
      const { title, location, country, startDate, endDate, description } =
        req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const destinationData = {
        title,
        location,
        country,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description,
        imageUrl,
      };

      const validatedData = destinationSchemaValidator.parse(destinationData);

      const newDestination = new destinationModel(validatedData);
      await newDestination.save();

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
  },
);

destinationRouter.delete(
  "/destinations/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await connect();
      const { id } = req.params;
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
