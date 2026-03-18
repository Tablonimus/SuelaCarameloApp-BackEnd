import { Router } from "express";
import {
  getSponsors,
  createSponsor,
  deleteSponsor,
} from "../controllers/sponsors.controller.js";

const router = Router();

router.get("/", getSponsors);
router.post("/", createSponsor);
router.delete("/:id", deleteSponsor);

export default router;
