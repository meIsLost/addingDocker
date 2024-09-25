/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function loggerMiddleware(req, res, next) {
  console.log("Incoming request", {
    method: req.method,
    baseUrl: req.baseUrl,
    url: req.url,
    request: req,
  });

  next();
}
