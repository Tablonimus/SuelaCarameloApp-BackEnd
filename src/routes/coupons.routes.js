import { Router } from "express";
import {
  getCoupons,
  createCoupon,
  deleteCoupon,
} from "../controllers/coupons.controller.js";

const router = Router();

router.get("/", getCoupons);
router.post("/", createCoupon);
router.delete("/:id", deleteCoupon);

export default router;
