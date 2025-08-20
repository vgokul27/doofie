<<<<<<< HEAD
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaClock, FaUtensils, FaArrowLeft, FaHeart, FaShare, FaChartBar, FaFileAlt } from "react-icons/fa";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
=======
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/recipedetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
<<<<<<< HEAD
        setLoading(true);
=======
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
<<<<<<< HEAD
      } finally {
        setLoading(false);
=======
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb
      }
    };

    fetchRecipe();
  }, [id]);

<<<<<<< HEAD
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading delicious recipe...</p>
        </motion.div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recipe not found</h2>
          <button
            onClick={() => navigate('/home')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }
=======
  if (!recipe) return <p>Loading...</p>;
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb

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

<<<<<<< HEAD
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '2rem 1rem'
      }}
    >
      {/* Back Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/home')}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '0.75rem',
            color: '#f97316',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(249, 115, 22, 0.2)';
            e.target.style.borderColor = 'rgba(249, 115, 22, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <FaArrowLeft style={{ fontSize: '1.25rem' }} />
        </motion.button>
      </div>

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left Side - Recipe Image */}
          <motion.div variants={itemVariants} style={{ position: 'sticky', top: '2rem' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
              }}
            >
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                style={{
                  width: '100%',
                  height: '32rem',
                  objectFit: 'cover'
                }}
              />

              {/* Action buttons at bottom */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                display: 'flex',
                gap: '0.75rem'
              }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '50%',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(249, 115, 22, 0.8)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.6)'}
                >
                  <FaHeart style={{ fontSize: '1.25rem' }} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '50%',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(249, 115, 22, 0.8)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.6)'}
                >
                  <FaShare style={{ fontSize: '1.25rem' }} />
                </motion.button>
              </div>

              {/* Recipe stats overlay */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(16px)',
                borderRadius: '1rem',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <FaClock style={{ color: '#f97316' }} />
                  <span style={{ fontWeight: '600' }}>{recipe.cookingTime} mins</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <FaUtensils style={{ color: '#f97316' }} />
                  <span style={{ fontWeight: '600' }}>Easy</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Recipe Content */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div>
              <motion.h1
                variants={itemVariants}
                style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  background: 'linear-gradient(to right, #f97316, #ea580c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1rem',
                  lineHeight: '1.1'
                }}
              >
                {recipe.title}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  color: '#d1d5db',
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaClock style={{ color: '#f97316' }} />
                  <span>{recipe.cookingTime} mins</span>
                </div>
              </motion.div>
            </div>

            {/* Ingredients */}
            <motion.div variants={itemVariants} style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FaUtensils style={{ color: '#f97316' }} />
                Ingredients
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '0.75rem',
                      transition: 'all 0.2s',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(249, 115, 22, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                  >
                    <div style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      background: '#f97316',
                      borderRadius: '50%',
                      flexShrink: 0
                    }}></div>
                    <span style={{ color: '#d1d5db', fontWeight: '500' }}>{ingredient.trim()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div variants={itemVariants} style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FaFileAlt style={{ color: '#f97316' }} />
                Instructions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recipe.instructions
                  .split(".")
                  .filter((step) => step.trim())
                  .map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        padding: '1.25rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '1rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(249, 115, 22, 0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                    >
                      <div style={{
                        flexShrink: 0,
                        width: '2rem',
                        height: '2rem',
                        background: 'linear-gradient(135deg, #f97316, #ea580c)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '0.875rem'
                      }}>
                        {index + 1}
                      </div>
                      <p style={{ color: '#d1d5db', lineHeight: '1.6', fontWeight: '500' }}>
                        {step.trim()}.
                      </p>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Nutrition Table */}
            {Object.keys(nutritionData).length > 0 && (
              <motion.div variants={itemVariants} style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '1.5rem',
                padding: '2rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <FaChartBar style={{ color: '#f97316' }} />
                  Nutrition Information
                </h3>

                {/* Nutrition Table */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(249, 115, 22, 0.1)' }}>
                        <th style={{
                          padding: '1rem 1.5rem',
                          textAlign: 'left',
                          color: '#f97316',
                          fontWeight: '700',
                          fontSize: '1rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          Nutrient
                        </th>
                        <th style={{
                          padding: '1rem 1.5rem',
                          textAlign: 'right',
                          color: '#f97316',
                          fontWeight: '700',
                          fontSize: '1rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(nutritionData).map(([key, value], idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          style={{
                            borderBottom: idx < Object.entries(nutritionData).length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(249, 115, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <td style={{
                            padding: '1rem 1.5rem',
                            color: '#d1d5db',
                            fontWeight: '500',
                            textTransform: 'capitalize'
                          }}>
                            {key}
                          </td>
                          <td style={{
                            padding: '1rem 1.5rem',
                            textAlign: 'right',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '1.125rem'
                          }}>
                            {value}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
=======
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
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb
  );
}

export default RecipeDetails;
