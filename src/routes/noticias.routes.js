import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getNoticias,
  getNoticia,
  createNoticia,
  deleteNoticia,
  updateNoticia,
} from "../controllers/noticias.controller.js";
import { noticiasSchema } from "../schemas/noticias.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/", getNoticias);
router.get("/:id", getNoticia);
router.post("/", authRequired, createNoticia);
router.delete("/:id", authRequired, deleteNoticia);
router.put("/:id", authRequired, updateNoticia);

export default router;
