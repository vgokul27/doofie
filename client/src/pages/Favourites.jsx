import { useState, useEffect } from "react";
import { FaHeart, FaClock, FaUtensils, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading favourites from localStorage or API
    const loadFavourites = () => {
      const savedFavourites =
        JSON.parse(localStorage.getItem("favouriteRecipes")) || [];
      setFavourites(savedFavourites);
      setLoading(false);
    };

    // Simulate API delay
    setTimeout(loadFavourites, 1000);
  }, []);

  const removeFavourite = (recipeId) => {
    const updatedFavourites = favourites.filter(
      (recipe) => recipe._id !== recipeId
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favouriteRecipes", JSON.stringify(updatedFavourites));
  };

  const viewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
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
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 via-pink-600 to-purple-600 text-white py-16 mb-12 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <FaHeart className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            My Favourite Recipes
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Your collection of beloved dishes, saved for quick access
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce-subtle"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
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
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {favourites.length} Favourite Recipe
                {favourites.length !== 1 ? "s" : ""}
              </h2>
              <button
                onClick={() => navigate("/home")}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <FaUtensils />
                <span>Browse More</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favourites.map((recipe) => (
                <div
                  key={recipe._id}
                  className="card overflow-hidden group hover:scale-105 transform transition-all duration-300"
                >
                  {/* Recipe Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => viewRecipe(recipe._id)}
                        className="w-10 h-10 bg-blue-500/90 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <button
                        onClick={() => removeFavourite(recipe._id)}
                        className="w-10 h-10 bg-red-500/90 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>

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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-16 mb-12">
          <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-l-4 border-primary-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaHeart className="text-primary-600 mr-3" />
              Pro Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">💡 Quick Access</h4>
                <p className="text-sm">
                  Save recipes you love for easy access anytime. Perfect for
                  meal planning!
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🏷️ Organization</h4>
                <p className="text-sm">
                  Your favourites are automatically saved locally and synced
                  with your account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Mobile Friendly</h4>
                <p className="text-sm">
                  Access your favourite recipes on any device, anywhere you
                  cook!
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔄 Easy Management</h4>
                <p className="text-sm">
                  Remove recipes that no longer interest you to keep your list
                  fresh and relevant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favourites;
