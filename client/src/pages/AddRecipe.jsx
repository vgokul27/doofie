import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import axios from "axios";
import "../styles/addrecipe.css"; 
import { getAuthToken } from "../services/firebase"; // ✅ import this


function AddRecipe() {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // ✅ Get logged-in user
  const adminEmail = "vgokulraj691@gmail.com"; // ✅ Replace with actual admin email

  const [recipe, setRecipe] = useState({
    title: "",
    imageUrl: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    nutrition: [{ nutrient: "", value: "" }],
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const newRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
    };

    const token = await getAuthToken(); // ✅ get token

    if (!token) {
      setMessage("❌ You must be logged in to add recipes.");
      return;
    }

    const res = await axios.post("http://localhost:5000/api/recipes", newRecipe, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage("✅ Recipe added successfully!");
    setRecipe({
      title: "",
      imageUrl: "",
      ingredients: "",
      instructions: "",
      cookingTime: "",
      nutrition: [{ nutrient: "", value: "" }],
    });

    setTimeout(() => {
      setMessage("");
      navigate("/home");
    }, 1000);
  } catch (err) {
    console.error("❌ Error posting recipe:", err.response?.data || err.message);
    setMessage("❌ Something went wrong. Try again.");
  }
};


  // ✅ Restrict access to admin only
  if (!currentUser || currentUser.email !== adminEmail) {
    return (
      <div className="page">
        <div className="form-wrapper">
          <h2 className="form-title" style={{ color: "crimson", textAlign: "center" }}>
            ❌ Only admin can add recipes.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="form-wrapper">
        <h2 className="form-title">Add Recipe</h2>

        {message && <div className="msg">{message}</div>}

        <form className="recipe-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={recipe.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={recipe.imageUrl}
            onChange={handleChange}
            required
          />

          <textarea
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          ></textarea>

          <textarea
            name="instructions"
            placeholder="Instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type="number"
            name="cookingTime"
            placeholder="Cooking Time (in mins)"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="nutrition"
            placeholder="Nutrition Info"
            value={recipe.nutrition}
            onChange={handleChange}
          />

          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
