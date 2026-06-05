import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getNoticias,
  getNoticia,
  createNoticia,
  deleteNoticia,
  updateNoticia,
  toggleApproval,
} from "../controllers/notices.controller.js";

const router = Router();

router.get("/", getNoticias);
router.get("/:id", getNoticia);
router.post("/", createNoticia);
router.delete("/:id", deleteNoticia);
router.put("/:id",  updateNoticia);
router.patch("/:id/approve", toggleApproval);

export default router;
