import { Request, Response } from 'express';
import Location from '../models/Location';
import { handleError } from "../utils/handleError";
// Get unique admin1 (governorates)
export const getGovernorates = async (req: Request, res: Response) => {
  try {
    const governorates = await Location.findAll({
      attributes: ["admin1_name_en", "admin1_name_ar"],
      group: ["admin1_name_en", "admin1_name_ar"],
    });
    res.json(governorates);
  } catch (error) {
    handleError(error, res, "Failed to fetch Governorates");
  }
};

// Get unique admin2 (cities) for a specific admin1
export const getCities = async (req: Request, res: Response) => {
  const { admin1 } = req.query; // Receive admin1 as query parameter
  try {
    const cities = await Location.findAll({
      attributes: ["admin2_name_en", "admin2_name_ar"],
      where: { admin1_name_en: admin1 },
      group: ["admin2_name_en", "admin2_name_ar"],
    });
    res.json(cities);
  } catch (error) {
    handleError(error, res, "Failed to fetch cities");
  }
};

// Get unique admin3 (towns or neighborhoods) for a specific admin2
export const getTowns = async (req: Request, res: Response) => {
  const { admin2 } = req.query; // Receive admin2 as query parameter
  try {
    const towns = await Location.findAll({
      attributes: ["admin3_name_en", "admin3_name_ar"],
      where: { admin2_name_en: admin2 },
      group: ["admin3_name_en", "admin3_name_ar"],
    });
    res.json(towns);
  } catch (error) {
    handleError(error, res, "Failed to fetch towns");
  }
};
