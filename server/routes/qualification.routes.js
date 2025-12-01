// server/routes/qualification.routes.js
import express from "express";
import {
  getQualifications,
  createQualification,
  updateQualification,
  deleteQualification,
} from "../controller/qualification.controller.js";
// If you want admin-only protection, you can add middleware here later

const router = express.Router();

router.get("/", getQualifications);
router.post("/", createQualification);
router.put("/:id", updateQualification);
router.delete("/:id", deleteQualification);

export default router;


