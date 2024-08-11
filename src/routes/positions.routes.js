import { Router } from "express";
import { createPosition, getPositions,getGeneralPositions,createGeneralPosition } from "../controllers/positions.controller.js";

const router = Router();

router.get("/", getPositions);
router.get("/general", getGeneralPositions);
router.post("/general", createGeneralPosition);
// router.get("/:id", getNoticia);
router.post("/", createPosition);
// router.delete("/:id", deleteNoticia);
// router.put("/:id",  updateNoticia);

export default router;
