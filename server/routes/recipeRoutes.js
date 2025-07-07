import express from "express";
import {
  addRecipe,
  getRecipes,
  getRecipeById
} from "../controllers/recipeController.js";

import {
  verifyToken,
  verifyAdmin
} from "../config/authMiddleware.js"; // ✅ Import auth middleware

const router = express.Router();

// 🔐 Only admin can add
router.post("/", verifyToken, verifyAdmin, addRecipe);

// 🆓 Public access
router.get("/", getRecipes);
router.get("/:id", getRecipeById);

export default router;
