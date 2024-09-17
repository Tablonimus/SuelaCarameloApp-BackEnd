//import { authRequired } from "../middlewares/validateToken.js";
import { Router } from "express";
import {
  getTeams,

  createTeam,
  createManyTeams,

} from "../controllers/teams.controller.js";

const router = Router();

router.get("/", getTeams);
router.post("/", createTeam);
router.post("/create-many", createManyTeams);


export default router;
