import { Router } from "express";
import {
  getPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
} from "../controllers/players.controller.js";

const router = Router();

router.get("/", getPlayers);

router.get("/:id");
router.post("/", createPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
