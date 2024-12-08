import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import FoundDetained from "../models/FoundDetained";
import NodeCache from "node-cache";
import { handleError } from "../utils/handleError";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Create a new found record
// Example curl command:
// curl -X POST http://localhost:3000/found -H "Content-Type: application/json" -d '{"first_name": "Jane", "last_name": "Doe", "dob": "1990-01-01", "father_name": "Father", "mother_name": "Mother", "nickname": "Janie", "date_of_freedom": "2020-01-01", "place_last_seen": "Place", "current_stay_address": "Address", "next_address": "New Address", "last_photo": "photo.jpg", "prison_name": "Prison", "status": "alive", "origin_admin1_en": "Admin1", "origin_admin1_ar": "Admin1_ar", "origin_admin2_en": "Admin2", "origin_admin2_ar": "Admin2_ar", "origin_admin3_en": "Admin3", "origin_admin3_ar": "Admin3_ar"}'
export const createFound = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newFound = await FoundDetained.create(req.body);
    res.status(201).json(newFound);
  } catch (error) {
    console.error(
      "Error creating found record:",
      (error as Error).message,
      (error as Error).stack
    );
    next(error);
  }
};

// Get all found records
// Example curl command:
// curl http://localhost:3000/found
export const getAllFound = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cacheKey = "all_found";
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log("Serving from cache");
      res.status(200).json(cachedData);
      return;
    }

    const allFound = await FoundDetained.findAll();
    cache.set(cacheKey, allFound);
    console.log("Serving from database and caching the result");
    res.status(200).json(allFound);
  } catch (error) {
    console.error(
      "Error getting all found records:",
      (error as Error).message,
      (error as Error).stack
    );
    next(error);
  }
};

// Find by name
// Example curl command:
// curl http://localhost:3000/found/name/Jane
export const findByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    const results = await FoundDetained.findAll({
      where: { first_name: { [Op.iLike]: `%${name}%` } },
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(
      "Error finding by name:",
      (error as Error).message,
      (error as Error).stack
    );
    next(error);
  }
};

// Find by last name
// Example curl command:
// curl http://localhost:3000/found/lastname/Doe
export const findByLastName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lastname } = req.params;
    const results = await FoundDetained.findAll({
      where: { last_name: { [Op.iLike]: `%${lastname}%` } },
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(
      "Error finding by last name:",
      (error as Error).message,
      (error as Error).stack
    );
    next(error);
  }
};

// Find by both name and last name
// Example curl command:
// curl http://localhost:3000/found/name/Jane/lastname/Doe
export const findByBoth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastname } = req.params;
    const results = await FoundDetained.findAll({
      where: {
        first_name: { [Op.iLike]: `%${name}%` },
        last_name: { [Op.iLike]: `%${lastname}%` },
      },
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(
      "Error finding by both name and last name:",
      (error as Error).message,
      (error as Error).stack
    );
    next(error);
  }
};

// Find by town and admin levels
// Example curl command:
// curl http://localhost:3000/found/admin1/Admin1/admin2/Admin2/admin3/Admin3
export const findByTown = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { admin1, admin2, admin3 } = req.params;
    const results = await FoundDetained.findAll({
      where: {
        origin_admin1_en: { [Op.iLike]: `%${admin1}%` },
        origin_admin2_en: { [Op.iLike]: `%${admin2}%` },
        origin_admin3_en: { [Op.iLike]: `%${admin3}%` },
      },
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(
      "Error finding by town and admin levels:",
      (error as Error).message,
      (error as Error).stack
    );
    next(error);
  }
};

// Find by prison
// Example curl command:
// curl http://localhost:3000/found/prison/Prison
export const findByPrison = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prison } = req.params;
    const results = await FoundDetained.findAll({
      where: { prison_name: { [Op.iLike]: `%${prison}%` } },
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(
      "Error finding by prison:",
      (error as Error).message,
      (error as Error).stack
    );
    next(error);
  }
};
