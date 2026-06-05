import { Router } from "express";
import { getUsers, createUser, updateUserRole, deleteUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:id/role", updateUserRole);
router.delete("/:id", deleteUser);

export default router;
