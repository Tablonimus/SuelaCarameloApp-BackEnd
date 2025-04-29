import { Router } from "express";
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  updateMatchScore,
  deleteMatch,
  getMatchesByCategory,
  getMatchesByTeam,
  getLiveMatches,
} from "../controllers/matchs.controller.js";
const router = Router();

router.post("/", createMatch);
router.get("/", getAllMatches);
router.get("/live", getLiveMatches);
router.get("/:id", getMatchById);
router.put("/:id", updateMatch);
router.patch("/:id/score", updateMatchScore);
router.delete("/:id", deleteMatch);
router.get("/category/:category", getMatchesByCategory);
router.get("/team/:teamId", getMatchesByTeam);

export default router;
