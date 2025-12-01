// server/routes/contact.routes.js
import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controller/contact.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public: contact form can be submitted by anyone
router.post("/", createContact);

// Admin-only routes
router.get("/", requireAuth, requireAdmin, getContacts);
router.get("/:id", requireAuth, requireAdmin, getContactById);
router.put("/:id", requireAuth, requireAdmin, updateContact);
router.delete("/:id", requireAuth, requireAdmin, deleteContact);

export default router;
