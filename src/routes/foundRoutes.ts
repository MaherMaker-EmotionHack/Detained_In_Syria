import { Router } from "express";
import { createFound, getAllFound } from "../controllers/FoundController";

const router = Router();

// Create a new found record
router.post("/", createFound);

// Get all found records
router.get("/", getAllFound);

export default router;
