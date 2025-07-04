import { Router } from "express";
import {
  createHeroImage,
  deleteHeroImage,
  getHeroImageById,
  getHeroImages,
  updateHeroImage,
} from "../controllers/heroSection.controller.js";

const router = Router();

// Rutas para Hero Images
router.get("/", getHeroImages); // Obtener todas las imágenes
router.get("/:id", getHeroImageById); // Obtener una imagen específica
router.post("/", createHeroImage); // Crear nueva imagen
router.put("/:id", updateHeroImage); // Actualizar imagen existente
router.delete("/:id", deleteHeroImage); // Eliminar imagen

export default router;
