// server/routes/auth.route.js
import express from "express";
import { signup, signin, signout } from "../controller/auth.controller.js"; 
//             ^^^^^^^^^  NOTE: controller (no "s")

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

export default router;
