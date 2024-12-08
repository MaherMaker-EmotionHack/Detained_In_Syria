import { Router } from "express";
import { createLost, getAllLost, findByName, findByLastName, findByBoth, findByTown, findByPrison } from "../controllers/LostController";

const router = Router();

router.post("/", createLost); // Create a new lost record
router.get("/", getAllLost); // Get all lost records

router.get("/name/:name", findByName); // Find by name
router.get("/lastname/:lastname", findByLastName); // Find by last name
router.get("/name/:name/lastname/:lastname", findByBoth); // Find by both name and last name
router.get("/admin1/:admin1/admin2/:admin2/admin3/:admin3", findByTown); // Find by admin levels
router.get("/prison/:prison", findByPrison); // Find by prison

export default router;
