import { Router } from "express";
import {
  getNoticias,
  getNoticia,
  getTopNoticias,
  getStatsByAuthor,
  createNoticia,
  deleteNoticia,
  updateNoticia,
  toggleApproval,
  approveAll,
} from "../controllers/notices.controller.js";

const router = Router();

router.get("/", getNoticias);
router.get("/top", getTopNoticias);
router.get("/stats-by-author", getStatsByAuthor);
router.patch("/approve-all", approveAll);
router.get("/:id", getNoticia);
router.post("/", createNoticia);
router.delete("/:id", deleteNoticia);
router.put("/:id",  updateNoticia);
router.patch("/:id/approve", toggleApproval);

export default router;
