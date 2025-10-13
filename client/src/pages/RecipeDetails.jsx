import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaClock,
  FaUtensils,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaUser,
} from "react-icons/fa";
import {
  pageVariants,
  pageTransition,
  containerVariants,
  cardVariants,
  heroVariants,
  fadeInUpVariants,
  scaleVariants,
  buttonVariants,
  slideInVariants,
} from "../utils/animations";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/recipes/${id}`
        );
        setRecipe(res.data);

        // Check if recipe is already saved
        const savedRecipes = JSON.parse(
          localStorage.getItem("favouriteRecipes") || "[]"
        );
        setIsSaved(
          savedRecipes.some((savedRecipe) => savedRecipe._id === res.data._id)
        );
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Save Recipe Function
  const handleSaveRecipe = () => {
    try {
      const savedRecipes = JSON.parse(
        localStorage.getItem("favouriteRecipes") || "[]"
      );

      if (isSaved) {
        // Remove from favorites
        const updatedRecipes = savedRecipes.filter(
          (savedRecipe) => savedRecipe._id !== recipe._id
        );
        localStorage.setItem(
          "favouriteRecipes",
          JSON.stringify(updatedRecipes)
        );
        setIsSaved(false);
        setSaveMessage("Recipe removed from favorites!");
      } else {
        // Add to favorites
        const updatedRecipes = [...savedRecipes, recipe];
        localStorage.setItem(
          "favouriteRecipes",
          JSON.stringify(updatedRecipes)
        );
        setIsSaved(true);
        setSaveMessage("Recipe saved to favorites!");
      }

      // Dispatch custom event to update favourites page immediately
      window.dispatchEvent(new CustomEvent("favouritesUpdated"));

      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setSaveMessage("Failed to save recipe");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  // Share Recipe Function
  const handleShareRecipe = async () => {
    const shareData = {
      title: `${recipe.title} - Doofie Recipe`,
      text: `Check out this delicious recipe: ${recipe.title}`,
      url: window.location.href,
    };

    try {
      // Use native Web Share API if available
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setShareMessage("Recipe shared successfully!");
      } else {
        // Fallback: Copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Recipe URL copied to clipboard!");
      }

      // Clear message after 3 seconds
      setTimeout(() => setShareMessage(""), 3000);
    } catch (error) {
      console.error("Error sharing recipe:", error);
      // Fallback: Try to copy URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Recipe URL copied to clipboard!");
      } catch {
        setShareMessage("Unable to share recipe");
      }
      setTimeout(() => setShareMessage(""), 3000);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Loading delicious recipe...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (error || !recipe) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            😔
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Recipe Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "This recipe doesn't exist"}
          </p>
          <motion.button
            onClick={() => navigate("/home")}
            className="btn-primary"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Back to Recipes
          </motion.button>
        </motion.div>
      </motion.div>
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
    <motion.div
      className="min-h-screen"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Navigation */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => navigate("/home")}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaArrowLeft />
          <span>Back to Recipes</span>
        </motion.button>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Recipe Image */}
          <motion.div className="space-y-4" variants={slideInVariants}>
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col items-center space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={handleSaveRecipe}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 text-sm ${
                    isSaved
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaHeart
                    className={`text-xs ${
                      isSaved ? "text-white" : "text-white"
                    }`}
                  />
                  <span>{isSaved ? "Saved" : "Save Recipe"}</span>
                </motion.button>
                <motion.button
                  onClick={handleShareRecipe}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaShare className="text-xs" />
                  <span>Share</span>
                </motion.button>
              </div>

              {/* Success Messages */}
              {saveMessage && (
                <motion.div
                  className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {saveMessage}
                </motion.div>
              )}
              {shareMessage && (
                <motion.div
                  className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {shareMessage}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Recipe Info */}
          <motion.div className="space-y-6" variants={fadeInUpVariants}>
            {/* Header */}
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                {recipe.title}
              </h1>

              <div className="flex items-center space-x-4 text-gray-600 text-sm">
                <div className="flex items-center space-x-1">
                  <FaClock className="text-primary-500 text-xs" />
                  <span className="font-medium">{recipe.cookingTime} mins</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaUtensils className="text-primary-500 text-xs" />
                  <span className="font-medium">Main Course</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaUser className="text-primary-500 text-xs" />
                  <span className="font-medium">Chef Special</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <motion.div className="card p-4" variants={cardVariants}>
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <motion.div
                  className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FaUtensils className="text-white text-xs" />
                </motion.div>
                Ingredients
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{ingredient}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div className="mt-8" variants={fadeInUpVariants}>
          <motion.div className="card p-4" variants={cardVariants}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <motion.div
                className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-2"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-white text-xs font-bold">📝</span>
              </motion.div>
              Cooking Instructions
            </h2>
            <div className="space-y-3">
              {recipe.instructions
                .split(".")
                .filter((step) => step.trim())
                .map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border-l-2 border-primary-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <motion.div
                      className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {index + 1}
                    </motion.div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {step.trim()}.
                    </p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Nutrition Information */}
        {Object.keys(nutritionData).length > 0 && (
          <motion.div
            className="mt-20 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">🥗</span>
                </div>
                Nutrition Facts
              </h2>

              {/* Nutrition Table - Centered */}
              <div className="max-w-md mx-auto">
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-center text-sm font-semibold">
                          Nutrition
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(nutritionData).map(
                        ([key, value], idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-4 py-3 text-sm font-medium text-gray-800 capitalize">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-semibold">
                              {value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default RecipeDetails;
