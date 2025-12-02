// server.js (project root)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import config from "./config/config.js";

import authRoutes from "./server/routes/auth.route.js";
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";

const app = express();

// ---- middleware
app.use(express.json());
app.use(cookieParser());

// CORS only really needed during local dev. In production (Render), frontend+backend are same origin.
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

// ---- API routes
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);

// ---- serve React build (client/dist)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, "client", "dist");

app.use(express.static(clientDist));

// IMPORTANT: SPA fallback for React routes (but NOT /api)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// ---- DB + start
const MONGO_URI = process.env.MONGO_URI || config.mongoUri;
const PORT = process.env.PORT || config.port || 10000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
