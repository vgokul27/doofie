import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { getAuthToken } from "../services/firebase";
import {
  FaUtensils,
  FaImage,
  FaListUl,
  FaBook,
  FaClock,
  FaLeaf,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLock,
} from "react-icons/fa";

function AddRecipe() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const adminEmail = "vgokulraj691@gmail.com";

  const [recipe, setRecipe] = useState({
    title: "",
    imageUrl: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    nutrition: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
      };

      const token = await getAuthToken();

      if (!token) {
        setMessage("❌ You must be logged in to add recipes.");
        setLoading(false);
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/recipes`,
        newRecipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Recipe added successfully!");
      setRecipe({
        title: "",
        imageUrl: "",
        ingredients: "",
        instructions: "",
        cookingTime: "",
        nutrition: "",
      });

      setTimeout(() => {
        setMessage("");
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error(
        "❌ Error posting recipe:",
        err.response?.data || err.message
      );
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Restrict access to admin only
  if (!currentUser || currentUser.email !== adminEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="card p-12 text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaLock className="text-red-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 mb-6">
            Only authorized administrators can add new recipes to the platform.
          </p>
          <button onClick={() => navigate("/home")} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaUtensils className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Add New Recipe
          </h1>
          <p className="text-gray-600 text-lg">
            Share a delicious recipe with the Doofie community
          </p>
        </div>

        {/* Status Messages */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-xl border-l-4 ${
              message.includes("✅")
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
          >
            <div className="flex items-center">
              {message.includes("✅") ? (
                <FaCheckCircle className="mr-3" />
              ) : (
                <FaExclamationTriangle className="mr-3" />
              )}
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Recipe Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <FaUtensils className="mr-2 text-gray-500" />
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter an appetizing recipe title"
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <FaImage className="mr-2 text-gray-500" />
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={recipe.imageUrl}
                onChange={handleChange}
                className="input-field"
                placeholder="https://example.com/recipe-image.jpg"
                required
              />
              {recipe.imageUrl && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={recipe.imageUrl}
                    alt="Recipe preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <FaListUl className="mr-2 text-gray-500" />
                Ingredients
              </label>
              <textarea
                name="ingredients"
                value={recipe.ingredients}
                onChange={handleChange}
                className="input-field h-32 resize-none"
                placeholder="2 cups flour, 1 tsp salt, 3 eggs, 1 cup milk..."
                required
              />
              <p className="text-xs text-gray-500">
                Separate each ingredient with a comma
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <FaBook className="mr-2 text-gray-500" />
                Cooking Instructions
              </label>
              <textarea
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}
                className="input-field h-40 resize-none"
                placeholder="1. Preheat oven to 350°F...&#10;2. Mix dry ingredients...&#10;3. Add wet ingredients..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cooking Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaClock className="mr-2 text-gray-500" />
                  Cooking Time (minutes)
                </label>
                <input
                  type="number"
                  name="cookingTime"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="30"
                  min="1"
                  required
                />
              </div>

              {/* Nutrition Info */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaLeaf className="mr-2 text-gray-500" />
                  Nutrition Info (optional)
                </label>
                <input
                  type="text"
                  name="nutrition"
                  value={recipe.nutrition}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="250 calories, 12g protein, 30g carbs"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-primary text-lg py-4 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Recipe...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FaUtensils />
                    <span>Add Recipe</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button onClick={() => navigate("/home")} className="btn-secondary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRecipe;
