import { Response } from "express";

/**
 * Centralized error handler.
 * Logs the error and sends a structured response to the client.
 *
 * @param error - The error object or message
 * @param res - Express Response object
 * @param message - Custom error message to display
 */
export const handleError = (error: unknown, res: Response, message: string) => {
  console.error(message, error); // Log the error for debugging
  res.status(500).json({
    error: message,
    details: error instanceof Error ? error.message : "Unknown error",
  });
};
