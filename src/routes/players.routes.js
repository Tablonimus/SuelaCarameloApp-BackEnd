import { Router } from "express";
import {
  getPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
} from "../controllers/players.controller.js";

const router = Router();

router.get("/players",getPlayers);
router.get("/players/:id");
router.post("/players",createPlayer);
router.put("/players/:id",updatePlayer);
router.delete("/players/:id", deletePlayer);

export default router;