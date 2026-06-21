import { Router } from "express";
import {
  trackPageView,
  getPageViewStats,
  getPageViewsByDay,
} from "../controllers/pageViews.controller.js";

const router = Router();

router.post("/track", trackPageView);
router.get("/stats", getPageViewStats);
router.get("/by-day", getPageViewsByDay);

export default router;
