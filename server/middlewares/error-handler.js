import { NODE_ENV } from "../config/config.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  const stack = NODE_ENV === "production" ? null : err.stack;

  const message = err.message;

  res.json({
    message: message,
    stack: stack,
  });
};
