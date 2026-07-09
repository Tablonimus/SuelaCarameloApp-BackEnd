import { Router } from "express";
import { createPosition, getPositions,getGeneralPositions,createGeneralPosition } from "../controllers/positions.controller.js";

const router = Router();

router.get("/", getPositions);
router.get("/general", getGeneralPositions);
router.post("/general", createGeneralPosition);
router.post("/", createPosition);

export default router;
