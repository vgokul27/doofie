// server/routes/apiKeyRoutes.js
import express from "express";
import { getApiKey, regenerateApiKey } from "../controllers/apiKeyController.js";
import { verifyToken } from "../config/authMiddleware.js"; // ✅ Use named import

const router = express.Router();

// 🔐 Secure these routes using Firebase token
router.get("/", verifyToken, getApiKey);
router.post("/regenerate", verifyToken, regenerateApiKey);

export default router;
