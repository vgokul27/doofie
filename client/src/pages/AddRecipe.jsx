import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import axios from "axios";
import { motion } from "framer-motion";
import { FaPlus, FaImage, FaClock, FaUtensils, FaListUl, FaFileAlt } from "react-icons/fa";
import { getAuthToken } from "../services/firebase";

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

      const token = await getAuthToken();

      if (!token) {
        setMessage("❌ You must be logged in to add recipes.");
        return;
      }

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/recipes`, newRecipe, {
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
        nutrition: "",
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Restrict access to admin only
  if (!currentUser || currentUser.email !== adminEmail) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '28rem',
            width: '100%'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(to right, #ef4444, #dc2626)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}
          >
            <FaUtensils style={{ color: 'white', fontSize: '1.5rem' }} />
          </motion.div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
            Access Restricted
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
            Only admin can add recipes to the collection.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            style={{
              background: 'linear-gradient(to right, #f97316, #ea580c)',
              color: 'white',
              fontWeight: '600',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '2rem 1rem'
    }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '56rem', margin: '0 auto' }}
      >
        <motion.div style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          padding: '3rem'
        }}>
          {/* Header */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                width: '5rem',
                height: '5rem',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
              }}
            >
              <FaPlus style={{ color: 'white', fontSize: '1.75rem' }} />
            </motion.div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'white',
              marginBottom: '0.75rem',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Create New Recipe
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>
              Share your culinary masterpiece with the world
            </p>
          </motion.div>

          {/* Success/Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg text-center mb-6 ${
                message.includes('✅') 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}
            >
              {message}
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            variants={itemVariants}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
          >
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Title Input */}
              <motion.div variants={itemVariants}>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  Recipe Title *
                </label>
                <div style={{ position: 'relative' }}>
                  <FaFileAlt style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter a delicious recipe title..."
                    value={recipe.title}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      paddingLeft: '3rem',
                      paddingRight: '1rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f97316';
                      e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                  />
                </div>
              </motion.div>

              {/* Image URL Input */}
              <motion.div variants={itemVariants}>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  Recipe Image URL *
                </label>
                <div style={{ position: 'relative' }}>
                  <FaImage style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="https://example.com/recipe-image.jpg"
                    value={recipe.imageUrl}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      paddingLeft: '3rem',
                      paddingRight: '1rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f97316';
                      e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                  />
                </div>
              </motion.div>

              {/* Cooking Time Input */}
              <motion.div variants={itemVariants}>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  Cooking Time (minutes) *
                </label>
                <div style={{ position: 'relative' }}>
                  <FaClock style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <input
                    type="number"
                    name="cookingTime"
                    placeholder="30"
                    value={recipe.cookingTime}
                    onChange={handleChange}
                    required
                    min="1"
                    style={{
                      width: '100%',
                      paddingLeft: '3rem',
                      paddingRight: '1rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f97316';
                      e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Ingredients Textarea */}
              <motion.div variants={itemVariants}>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  Ingredients *
                </label>
                <div style={{ position: 'relative' }}>
                  <FaListUl style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '1rem',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <textarea
                    name="ingredients"
                    placeholder="Enter ingredients separated by commas&#10;e.g., 2 cups flour, 1 tsp salt, 3 eggs, 1 cup milk"
                    value={recipe.ingredients}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      paddingLeft: '3rem',
                      paddingRight: '1rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f97316';
                      e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                  />
                </div>
              </motion.div>

              {/* Instructions Textarea */}
              <motion.div variants={itemVariants}>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  Cooking Instructions *
                </label>
                <div style={{ position: 'relative' }}>
                  <FaFileAlt style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '1rem',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <textarea
                    name="instructions"
                    placeholder="Describe step by step how to prepare this recipe...&#10;&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients in a bowl&#10;3. Add wet ingredients and stir until combined&#10;4. Bake for 25-30 minutes"
                    value={recipe.instructions}
                    onChange={handleChange}
                    required
                    rows={8}
                    style={{
                      width: '100%',
                      paddingLeft: '3rem',
                      paddingRight: '1rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f97316';
                      e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Full Width Fields */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Nutrition Textarea */}
              <motion.div variants={itemVariants}>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  Nutrition Information <span style={{ color: '#9ca3af', fontWeight: '400' }}>(optional)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <FaUtensils style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '1rem',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <textarea
                    name="nutrition"
                    placeholder="Enter nutrition information separated by commas&#10;e.g., Calories: 250, Protein: 15g, Carbs: 30g, Fat: 8g, Fiber: 4g"
                    value={recipe.nutrition}
                    onChange={handleChange}
                    rows={4}
                    style={{
                      width: '100%',
                      paddingLeft: '3rem',
                      paddingRight: '1rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f97316';
                      e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{
                  width: '100%',
                  padding: '1.25rem 2rem',
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  borderRadius: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
                  marginTop: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #ea580c, #c2410c)';
                  e.target.style.boxShadow = '0 15px 40px rgba(249, 115, 22, 0.4)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #f97316, #ea580c)';
                  e.target.style.boxShadow = '0 10px 30px rgba(249, 115, 22, 0.3)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                  <FaPlus />
                  <span>Create Recipe</span>
                </div>
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AddRecipe;
