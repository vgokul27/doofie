import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredients: [{ type: String }],
  instructions: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  nutrition: { type: String }
});

export default mongoose.model("Recipe", recipeSchema);
