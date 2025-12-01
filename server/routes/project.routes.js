// server/routes/project.routes.js
import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";
// if you want to protect with auth, import middleware here
// import { authMiddleware, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// If you want auth, wrap like: router.get("/", authMiddleware, adminOnly, getProjects);
router.get("/", getProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;

