import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/recipedetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

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
    <div className="recipe-details-container">
      <div className="recipe-image">
        <img src={recipe.imageUrl} alt={recipe.title} />
      </div>

      <div className="recipe-info">
        <div className="recipe-header">
          <h1>{recipe.title}</h1>
          <p className="cooking-time"><strong>Cooking Time: </strong>{recipe.cookingTime} mins</p>
        </div>

        <h3>Ingredients:</h3>
        <p>{recipe.ingredients.join(" , ")}</p>

        <h3>Instructions:</h3>
        {recipe.instructions
          .split(".")
          .filter((step) => step.trim())
          .map((step, index) => (
            <p key={index}><strong>Step {index + 1}:</strong> {step.trim()}.</p>
          ))}

        {Object.keys(nutritionData).length > 0 && (
          <>
            <h3>Nutrition:</h3>
            <table className="nutrition-table">
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(nutritionData).map(([key, value], idx) => (
                  <tr key={idx}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
