import { Router } from "express";
import { createLost, getAllLost } from "../controllers/LostController";

const router = Router();

router.post("/", createLost); // Create a new lost record
router.get("/", getAllLost); // Get all lost records

export default router;
