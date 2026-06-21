import { Router } from "express";
import {
  getAnalyticsOverview,
  getAnalyticsTimeline,
} from "../controllers/analytics.controller.js";

const router = Router();

router.get("/overview", getAnalyticsOverview);
router.get("/timeline", getAnalyticsTimeline);

export default router;
