import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaUtensils, FaClock, FaHeart } from "react-icons/fa";
import {
  pageVariants,
  pageTransition,
  containerVariants,
  cardVariants,
  buttonVariants,
  pulseAnimation,
} from "../utils/animations";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(16);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          setError("API base URL not defined.");
          return;
        }

        const res = await axios.get(`${apiUrl}/api/recipes`);
        console.log("✅ API Response:", res.data);

        if (Array.isArray(res.data)) {
          setRecipes(res.data);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        console.error("❌ Failed to fetch recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Load favorites from localStorage
    const loadFavorites = () => {
      const savedFavorites =
        JSON.parse(localStorage.getItem("favouriteRecipes")) || [];
      setFavorites(savedFavorites.map((fav) => fav._id));
    };

    fetchRecipes();
    loadFavorites();
  }, []);

  const toggleFavorite = (e, recipe) => {
    e.stopPropagation(); // Prevent navigation when clicking heart
    const savedFavorites =
      JSON.parse(localStorage.getItem("favouriteRecipes")) || [];
    const isCurrentlyFavorite = favorites.includes(recipe._id);

    if (isCurrentlyFavorite) {
      // Remove from favorites
      const updatedFavorites = savedFavorites.filter(
        (fav) => fav._id !== recipe._id
      );
      localStorage.setItem(
        "favouriteRecipes",
        JSON.stringify(updatedFavorites)
      );
      setFavorites((prev) => prev.filter((id) => id !== recipe._id));
    } else {
      // Add to favorites
      const updatedFavorites = [...savedFavorites, recipe];
      localStorage.setItem(
        "favouriteRecipes",
        JSON.stringify(updatedFavorites)
      );
      setFavorites((prev) => [...prev, recipe._id]);
    }
  };

  const filteredRecipes = search
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      )
    : recipes.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
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
          className="text-center space-y-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto"
            animate={pulseAnimation}
          >
            <FaUtensils className="text-white text-2xl" />
          </motion.div>
          <motion.p
            className="text-gray-600 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Loading delicious recipes...
          </motion.p>
        </motion.div>
      </motion.div>
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
      {/* Hero Section */}
      <motion.div
        className="relative text-gray-800 py-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight text-gray-800">
            Discover Amazing
            <span className=" text-primary-600"> Recipes </span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-8 mt-4 max-w-2xl mx-auto leading-relaxed">
            From quick weeknight dinners to gourmet masterpieces, find your next favorite dish
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 text-sm" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 rounded-4xl bg-white border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-300 shadow-sm"
              placeholder="Search for recipes, ingredients..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(16);
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div
          className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-medium">{error}</p>
        </motion.div>
      )}

      {/* Recipes Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {Array.isArray(filteredRecipes) && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe._id}
              className="card group cursor-pointer overflow-hidden transform transition-all duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/recipes/${recipe._id}`)}
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Click to view recipe</p>
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                  {recipe.title}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <FaClock className="text-xs" />
                    <span className="text-sm">{recipe.cookingTime} mins</span>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(e, recipe)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      favorites.includes(recipe._id)
                        ? "bg-red-100 hover:bg-red-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <FaHeart
                      className={`text-sm ${
                        favorites.includes(recipe._id)
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600">
              {search
                ? `No recipes found for "${search}"`
                : "Start exploring our amazing recipe collection!"}
            </p>
          </div>
        )}
      </motion.div>

      {/* Load More Button */}
      {!search && visibleCount < recipes.length && (
        <motion.div
          className="text-center pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={handleLoadMore}
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Load More Recipes</span>
            <FaUtensils className="text-sm" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Home;
