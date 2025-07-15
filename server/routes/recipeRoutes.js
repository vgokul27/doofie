import express from "express";
import {
  addRecipe,
  getRecipes,
  getRecipeById,
  handlePing
} from "../controllers/recipeController.js";

import {
  verifyToken,
  verifyAdmin
} from "../config/authMiddleware.js";

const router = express.Router();

// 🔐 Only admin can add
router.post("/", verifyToken, verifyAdmin, addRecipe);

// 🆓 Public access
router.get("/", getRecipes);
router.get("/ping",handlePing);
router.get("/:id", getRecipeById);

export default router;
