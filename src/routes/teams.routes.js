import { Router } from "express";
import {
  getTeams,
  createTeam,
  createManyTeams,
  updateTeam,
  deleteTeam,
} from "../controllers/teams.controller.js";

const router = Router();

router.get("/", getTeams);
router.post("/", createTeam);
router.post("/create-many", createManyTeams);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
