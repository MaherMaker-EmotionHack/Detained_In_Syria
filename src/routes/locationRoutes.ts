import { Router } from "express";
import {
  getGovernorates,
  getCities,
  getTowns,
} from "../controllers/LocationController";

const router = Router();

// Pass only valid middleware functions
router.get("/governorates", getGovernorates);
router.get("/cities", getCities);
router.get("/towns", getTowns);

export default router;
