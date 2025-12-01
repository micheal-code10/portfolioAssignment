// server/routes/user.routes.js
import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin-only user management
router.get("/", requireAuth, requireAdmin, getUsers);
router.get("/:id", requireAuth, requireAdmin, getUserById);
router.put("/:id", requireAuth, requireAdmin, updateUser);
router.delete("/:id", requireAuth, requireAdmin, deleteUser);

export default router;

