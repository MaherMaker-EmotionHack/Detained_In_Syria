import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import LostDetained from "../models/LostDetained";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Create a new lost record
// Example curl command:
// curl -X POST http://localhost:3000/lost -H "Content-Type: application/json" -d '{"first_name": "John", "last_name": "Doe", "dob": "1990-01-01", "father_name": "Father", "mother_name": "Mother", "nickname": "Johnny", "date_of_loss": "2020-01-01", "last_known_place": "Place", "last_home_address": "Address", "new_home_address": "New Address", "last_photo": "photo.jpg", "last_known_prison": "Prison", "status": "alive", "origin_admin1_en": "Admin1", "origin_admin1_ar": "Admin1_ar", "origin_admin2_en": "Admin2", "origin_admin2_ar": "Admin2_ar", "origin_admin3_en": "Admin3", "origin_admin3_ar": "Admin3_ar"}'
export const createLost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newLost = await LostDetained.create(req.body);
    res.status(201).json(newLost);
  } catch (error) {
    console.error("Error creating lost record:", (error as Error).message, (error as Error).stack);
    next(error); // Delegate the error to the global error handler
  }
};

// Get all lost records
// Example curl command:
// curl http://localhost:3000/lost
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
    console.error("Error getting all lost records:", (error as Error).message, (error as Error).stack);
    next(error); // Delegate the error to the global error handler
  }
};

// Find by name
// Example curl command:
// curl http://localhost:3000/lost/name/John
export const findByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.params;
    const results = await LostDetained.findAll({ where: { first_name: { [Op.iLike]: `%${name}%` } } });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error finding by name:", (error as Error).message, (error as Error).stack);
    next(error);
  }
};

// Find by last name
// Example curl command:
// curl http://localhost:3000/lost/lastname/Doe
export const findByLastName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { lastname } = req.params;
    const results = await LostDetained.findAll({ where: { last_name: { [Op.iLike]: `%${lastname}%` } } });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error finding by last name:", (error as Error).message, (error as Error).stack);
    next(error);
  }
};

// Find by both name and last name
// Example curl command:
// curl http://localhost:3000/lost/name/John/lastname/Doe
export const findByBoth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, lastname } = req.params;
    const results = await LostDetained.findAll({ where: { first_name: { [Op.iLike]: `%${name}%` }, last_name: { [Op.iLike]: `%${lastname}%` } } });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error finding by both name and last name:", (error as Error).message, (error as Error).stack);
    next(error);
  }
};

// Find by town and admin levels
// Example curl command:
// curl http://localhost:3000/lost/admin1/Admin1/admin2/Admin2/admin3/Admin3
export const findByTown = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { admin1, admin2, admin3 } = req.params;
    const results = await LostDetained.findAll({ where: { origin_admin1_en: { [Op.iLike]: `%${admin1}%` }, origin_admin2_en: { [Op.iLike]: `%${admin2}%` }, origin_admin3_en: { [Op.iLike]: `%${admin3}%` } } });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error finding by town and admin levels:", (error as Error).message, (error as Error).stack);
    next(error);
  }
};

// Find by prison
// Example curl command:
// curl http://localhost:3000/lost/prison/Prison
export const findByPrison = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { prison } = req.params;
    const lost = await LostDetained.findAll({ where: { last_known_prison: prison } });
    res.status(200).json(lost);
  } catch (error) {
    console.error("Error finding by prison:", (error as Error).message, (error as Error).stack);
    next(error);
  }
};
