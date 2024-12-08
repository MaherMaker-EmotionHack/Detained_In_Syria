import { Request, Response } from "express";
import FoundDetained from "../models/FoundDetained";
import { handleError } from "../utils/handleError";

// Create a new found record
export const createFound = async (req: Request, res: Response) => {
  try {
    const newFound = await FoundDetained.create(req.body);
    res.status(201).json(newFound);
  } catch (error) {
    handleError(error, res, "Failed to create found record");
  }
};

// Get all found records
export const getAllFound = async (req: Request, res: Response) => {
  try {
    const allFound = await FoundDetained.findAll();
    res.status(200).json(allFound);
  } catch (error) {
    handleError(error, res, "Failed to fetch found records");
  }
};
