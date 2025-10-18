import mongoose from "mongoose";
import Recipe from "../models/Recipe.js";
import dotenv from "dotenv";

dotenv.config();

// Sample ingredients for the Kidney Bean Curry recipe
const sampleIngredients = [
  "2 cups kidney beans (rajma)",
  "1 large onion, finely chopped",
  "3-4 tomatoes, pureed",
  "2 tsp ginger paste",
  "1 tsp turmeric powder",
  "1 tsp Kashmiri chili powder",
  "2 tsp coriander powder",
  "1 tsp garam masala",
  "1/2 cup plain yogurt",
  "2 tbsp ghee or oil",
  "1 tsp cumin seeds",
  "1/4 tsp asafetida (hing)",
  "Fresh cilantro for garnish",
  "Salt to taste",
  "7 cups water",
];

async function updateExistingRecipes() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find all recipes that don't have ingredients field
    const recipesWithoutIngredients = await Recipe.find({
      $or: [
        { ingredients: { $exists: false } },
        { ingredients: null },
        { ingredients: [] },
      ],
    });

    console.log(
      `📋 Found ${recipesWithoutIngredients.length} recipes without ingredients`
    );

    if (recipesWithoutIngredients.length === 0) {
      console.log("✅ All recipes already have ingredients!");
      return;
    }

    // Update each recipe
    for (let recipe of recipesWithoutIngredients) {
      console.log(`🔄 Updating recipe: ${recipe.title}`);

      // For demonstration, we'll add sample ingredients to all recipes
      // In a real scenario, you might want to manually add appropriate ingredients for each recipe
      recipe.ingredients = sampleIngredients;
      await recipe.save();

      console.log(`✅ Updated: ${recipe.title}`);
    }

    console.log("🎉 All recipes updated successfully!");
  } catch (error) {
    console.error("❌ Error updating recipes:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

// Run the update
updateExistingRecipes();
