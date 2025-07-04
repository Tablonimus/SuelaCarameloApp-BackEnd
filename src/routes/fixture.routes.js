import { Router } from "express";
import {
  createFixture,
  deleteFixture,
  // getFixtureById,
  getFixtures,
  updateFixture,
} from "../controllers/fixture.controller.js";

const router = Router();

router.get("/", getFixtures);
// router.get("/:id", getFixtureById);
router.post("/", createFixture);
router.delete("/:id", deleteFixture);
router.put("/:id", updateFixture);

export default router;
