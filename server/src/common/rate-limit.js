import { rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 10 seconds).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Too many requests",
});
