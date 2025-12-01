// server.js  (root of portfolioAssignment)

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

const app = express();

// ===== MIDDLEWARE =====

// CORS: for development, reflect whatever origin is calling (so 5173/5174/5175 all work)
app.use(
  cors({
    origin: true,        // dynamically sets Access-Control-Allow-Origin to the request origin
    credentials: true,   // allow cookies (needed for JWT token)
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Simple health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running properly");
});

// ===== API ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);

// ===== DB CONNECTION + SERVER START =====
const MONGO_URI =
  config.mongoUri || config.MONGO_URI || config.dbUri || config.db;
const PORT = config.port || config.PORT || 3000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
  