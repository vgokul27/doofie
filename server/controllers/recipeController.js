import Recipe from "../models/Recipe.js";

export const addRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    console.error("Error in getRecipeById:", err.message);
    res.status(500).json({ message: "Failed to fetch recipe", error: err.message });
  }
};

// Ping controller
export const handlePing = (req, res) => {
  res.status(200).json({ message: "Server is awake!" });
};

