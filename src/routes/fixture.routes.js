import { Router } from "express";
import {
  createFixture,
  deleteFixture,
  fixFixtureNumbersToIntegers,
  getFixtures,
  normalizeAllFixtures,
  setActiveFixture,
  updateFixture,
} from "../controllers/fixture.controller.js";

const router = Router();

router.get("/", getFixtures);
router.post("/", createFixture);
router.put("/:id", updateFixture);
router.patch("/:id/activate", setActiveFixture);
router.delete("/:id", deleteFixture);
router.post("/normalize", fixFixtureNumbersToIntegers);

export default router;
