//import { authRequired } from "../middlewares/validateToken.js";
import { Router } from "express";
import {
  getTeams,

  createTeam,

} from "../controllers/teams.controller.js";

const router = Router();

router.get("/teams", getTeams);
router.post("/teams", createTeam);


export default router;
