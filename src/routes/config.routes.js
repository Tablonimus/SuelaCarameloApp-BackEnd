import { Router } from "express";
import { getActiveTournament, updateActiveTournament } from "../controllers/config.controller.js";

const router = Router();

router.get("/active-tournament",   getActiveTournament);
router.patch("/active-tournament", updateActiveTournament);

export default router;
