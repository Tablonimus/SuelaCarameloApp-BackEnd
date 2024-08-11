//import { authRequired } from "../middlewares/validateToken.js";
import { Router } from "express";
import {
  getTeams,

  createTeam,
  createManyTeams,

} from "../controllers/teams.controller.js";

const router = Router();

router.get("/teams", getTeams);
router.post("/teams", createTeam);
router.post("/teams/create_many", createManyTeams);


export default router;
