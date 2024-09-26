import { ApiError } from "../common/api-error.js";
import { logger } from "../common/logger.js";

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @param {unknown} error
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} _next
 */

export function errorHandlerMiddleware(error, _req, res, _next) {
  logger.error("API Error", { error });

  if (error instanceof ApiError) {
    return res.status(error.status).json({ ...error });
  }

  res.status(500).json({ message: "Something went wrong" });
}
