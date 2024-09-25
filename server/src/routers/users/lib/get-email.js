import { ApiError } from "../../../common/api-error.js";

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export function getEmailFromParams(req, res) {
  const { email } = req.params;
  const isValid = email && typeof email === "string";

  if (!isValid) {
    throw new ApiError(400, `Invalid url parameter ${email}`, res);
  }

  return email;
}
