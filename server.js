// server.js (root of portfolioAssignment)

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";

import authRoutes from "./server/routes/auth.route.js";
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();

// Needed for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: true, // allows render domain + localhost ports
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Health check (does NOT hijack homepage)
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running properly" });
});

// ===== API ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);

// ===== SERVE REACT FRONTEND (client/dist) =====
const clientDistPath = path.join(__dirname, "client", "dist");

if (process.env.NODE_ENV === "production" && fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // React Router fallback (REGEX, avoids Express "*" crash)
  // and avoids catching /api routes
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

// ===== DB CONNECTION + SERVER START =====
const MONGO_URI = config.mongoUri; // reads process.env.MONGO_URI in config/config.js
const PORT = process.env.PORT || config.port || 3000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
