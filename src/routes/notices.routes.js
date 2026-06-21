import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getNoticias,
  getNoticia,
  getTopNoticias,
  createNoticia,
  deleteNoticia,
  updateNoticia,
  toggleApproval,
  approveAll,
} from "../controllers/notices.controller.js";

const router = Router();

router.get("/", getNoticias);
router.get("/top", getTopNoticias);
router.patch("/approve-all", approveAll);
router.get("/:id", getNoticia);
router.post("/", createNoticia);
router.delete("/:id", deleteNoticia);
router.put("/:id",  updateNoticia);
router.patch("/:id/approve", toggleApproval);

export default router;
