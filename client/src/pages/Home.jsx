import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaUtensils, FaClock, FaHeart } from "react-icons/fa";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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

    fetchRecipes();
  }, []);

  const filteredRecipes = search
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      )
    : recipes.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center animate-pulse mx-auto">
            <FaUtensils className="text-white text-2xl" />
          </div>
          <p className="text-gray-600 font-medium">
            Loading delicious recipes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white py-12 mb-8 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Discover Amazing
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Recipes
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            From quick weeknight dinners to gourmet masterpieces, find your next
            favorite dish
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 text-lg shadow-xl"
              placeholder="Search for recipes, ingredients, cuisine..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(15);
              }}
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce-subtle"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 text-center">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Array.isArray(filteredRecipes) && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div
              key={recipe._id}
              className="card group cursor-pointer overflow-hidden hover:scale-105 transform transition-all duration-300 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                    <span className="text-sm">30 mins</span>
                  </div>
                  <div className="w-8 h-8 bg-primary-100 hover:bg-primary-200 rounded-full flex items-center justify-center transition-colors duration-200">
                    <FaHeart className="text-primary-600 text-sm" />
                  </div>
                </div>
              </div>
            </div>
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
      </div>

      {/* Load More Button */}
      {!search && visibleCount < recipes.length && (
        <div className="text-center pb-8">
          <button
            onClick={handleLoadMore}
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Load More Recipes</span>
            <FaUtensils className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
