import { ApiError } from "../common/api-error.js";
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

const REQ_TIMEOUT = 10000;

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function timeoutMiddleware(req, res, next) {
  req.setTimeout(REQ_TIMEOUT, () => {
    throw new ApiError(503, "Request timed out");
  });

  next();
}
