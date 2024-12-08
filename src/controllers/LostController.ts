import { Request, Response, NextFunction } from "express";
import LostDetained from "../models/LostDetained";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Create a new lost record
export const createLost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newLost = await LostDetained.create(req.body);
    res.status(201).json(newLost);
  } catch (error) {
    next(error); // Delegate the error to the global error handler
  }
};

// Get all lost records
export const getAllLost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cacheKey = "all_lost";
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log("Serving from cache");
      res.status(200).json(cachedData); // Send the cached data
      return; // Ensure the function ends here
    }

    const allLost = await LostDetained.findAll();
    cache.set(cacheKey, allLost); // Cache the retrieved data
    console.log("Serving from database and caching the result");
    res.status(200).json(allLost); // Send the retrieved data
  } catch (error) {
    next(error); // Delegate the error to the global error handler
  }
};
