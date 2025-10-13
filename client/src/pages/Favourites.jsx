import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaClock, FaUtensils, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  pageVariants,
  pageTransition,
  containerVariants,
  cardVariants,
  buttonVariants,
  fadeInUpVariants,
} from "../utils/animations";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favourites from localStorage
    const loadFavourites = () => {
      const savedFavourites =
        JSON.parse(localStorage.getItem("favouriteRecipes")) || [];
      setFavourites(savedFavourites);
      setLoading(false);
    };

    // Load immediately without delay for better UX
    loadFavourites();

    // Listen for storage changes to update favourites when recipes are saved from other pages
    const handleStorageChange = (e) => {
      if (e.key === "favouriteRecipes") {
        const updatedFavourites = JSON.parse(e.newValue || "[]");
        setFavourites(updatedFavourites);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events from same window (when saving from RecipeDetails)
    const handleFavouritesUpdate = () => {
      loadFavourites();
    };

    window.addEventListener("favouritesUpdated", handleFavouritesUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favouritesUpdated", handleFavouritesUpdate);
    };
  }, []);

  const removeFavourite = (recipeId) => {
    const updatedFavourites = favourites.filter(
      (recipe) => recipe._id !== recipeId
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favouriteRecipes", JSON.stringify(updatedFavourites));
  };

  const viewRecipe = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">
            Loading your favourite recipes...
          </p>
        </div>
      </div>
    );
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
      <motion.div
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {favourites.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaHeart className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Favourite Recipes Yet
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring recipes and save your favorites by clicking the
              heart icon!
            </p>
            <button
              onClick={() => navigate("/home")}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <FaUtensils />
              <span>Explore Recipes</span>
            </button>
          </div>
        ) : (
          /* Favourites Grid */
          <motion.div variants={fadeInUpVariants}>
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {favourites.length} Favourite Recipe
                {favourites.length !== 1 ? "s" : ""}
              </h2>
              <motion.button
                onClick={() => navigate("/home")}
                className="btn-secondary inline-flex items-center space-x-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaUtensils />
                <span>Browse More</span>
              </motion.button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
            >
              <AnimatePresence>
                {favourites.map((recipe) => (
                  <motion.div
                    key={recipe._id}
                    className="card overflow-hidden group"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    layout
                  >
                    {/* Recipe Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                      {/* Cooking Time Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 text-sm text-gray-800">
                          <FaClock className="text-xs" />
                          <span>{recipe.cookingTime} mins</span>
                        </div>
                      </div>
                    </div>

                    {/* Recipe Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {recipe.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {recipe.ingredients.slice(0, 3).join(", ")}
                        {recipe.ingredients.length > 3 && "..."}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewRecipe(recipe._id)}
                          className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                          View Recipe
                        </button>
                        <button
                          onClick={() => removeFavourite(recipe._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Favourites;
