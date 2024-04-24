import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getNoticias,
  getNoticia,
  createNoticia,
  deleteNoticia,
  updateNoticia,
} from "../controllers/notices.controller.js";

const router = Router();

router.get("/", getNoticias);
router.get("/:id", getNoticia);
router.post("/", createNoticia);
router.delete("/:id", deleteNoticia);
router.put("/:id",  updateNoticia);

export default router;
