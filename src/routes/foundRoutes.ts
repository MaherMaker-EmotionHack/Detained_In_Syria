import { Router } from "express";
import { 
  createFound, 
  getAllFound, 
  findByName, 
  findByLastName, 
  findByBoth, 
  findByTown, 
  findByPrison 
} from "../controllers/FoundController";

const router = Router();

// Create a new found record
router.post("/", createFound);

// Get all found records
router.get("/", getAllFound);

// Find by name
router.get("/name/:name", findByName);

// Find by last name
router.get("/lastname/:lastname", findByLastName);

// Find by both name and last name
router.get("/name/:name/lastname/:lastname", findByBoth);

// Find by town and admin levels
router.get("/admin1/:admin1/admin2/:admin2/admin3/:admin3", findByTown);

// Find by prison
router.get("/prison/:prison", findByPrison);

export default router;
