import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClock,
  FaUtensils,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaUser,
} from "react-icons/fa";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/recipes/${id}`
        );
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading delicious recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Recipe Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "This recipe doesn't exist"}
          </p>
          <button onClick={() => navigate("/home")} className="btn-primary">
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  // Format nutrition info into object pairs if it's a string
  const nutritionData = {};
  if (recipe.nutrition && typeof recipe.nutrition === "string") {
    recipe.nutrition.split(",").forEach((item) => {
      const [key, value] = item.split(":").map((str) => str.trim());
      if (key && value) {
        nutritionData[key] = value;
      }
    });
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Navigation */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          <FaArrowLeft />
          <span>Back to Recipes</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Recipe Image */}
          <div className="space-y-6">
            <div className="relative group">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-96 object-cover rounded-3xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-colors duration-200">
                <FaHeart />
                <span>Save Recipe</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors duration-200">
                <FaShare />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                {recipe.title}
              </h1>

              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaClock className="text-primary-500" />
                  <span className="font-medium">{recipe.cookingTime} mins</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUtensils className="text-primary-500" />
                  <span className="font-medium">Main Course</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUser className="text-primary-500" />
                  <span className="font-medium">Chef Special</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <FaUtensils className="text-white text-sm" />
                </div>
                Ingredients
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12">
          <div className="card p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold">📝</span>
              </div>
              Cooking Instructions
            </h2>
            <div className="space-y-6">
              {recipe.instructions
                .split(".")
                .filter((step) => step.trim())
                .map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border-l-4 border-primary-500"
                  >
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {step.trim()}.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Nutrition Information */}
        {Object.keys(nutritionData).length > 0 && (
          <div className="mt-12 mb-12">
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold">🥗</span>
                </div>
                Nutrition Facts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(nutritionData).map(([key, value], idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-2xl text-center border border-gray-100"
                  >
                    <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                      {key}
                    </h4>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
