import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes`);
        if (Array.isArray(res.data)) {
          setRecipes(res.data);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setError("Failed to load recipes. Please try again later.");
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

  return (
    <div className="home-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisibleCount(15); // Reset count on search
        }}
      />

      {error && <p className="error">{error}</p>}

      <div className="recipes-grid">
        {Array.isArray(filteredRecipes) && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              className="recipe-card"
              key={recipe._id}
              onClick={() => navigate(`/recipes/${recipe._id}`)}
            >
              <img src={recipe.imageUrl} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-results">No recipes found for "{search}"</p>
        )}
      </div>

      {!search && visibleCount < recipes.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          <strong>Load More</strong>
        </button>
      )}
      <br />
    </div>
  );
}

export default Home;
