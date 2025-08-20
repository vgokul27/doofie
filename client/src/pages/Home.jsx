import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaClock, FaHeart } from "react-icons/fa";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const fetchRecipes = async () => {
    try {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, y: -30 },
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
      {/* Hero Section */}
      <motion.div
        variants={searchVariants}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            fontSize: window.innerWidth < 768 ? '2.5rem' : '4rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #f97316, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Discover Amazing Recipes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: '#d1d5db', fontSize: '1.125rem', marginBottom: '2rem' }}
        >
          Explore our collection of delicious recipes from around the world
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ position: 'relative', maxWidth: '32rem', margin: '0 auto 2rem auto' }}
        >
          <div style={{ position: 'relative' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              fontSize: '1.125rem'
            }} />
            <input
              type="text"
              placeholder="Search for delicious recipes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(15);
              }}
              style={{
                width: '100%',
                paddingLeft: '3rem',
                paddingRight: '1.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                color: 'white',
                fontSize: '1.125rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f97316';
                e.target.style.boxShadow = '0 0 0 2px rgba(249, 115, 22, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recipes Grid */}
      <motion.div
        variants={containerVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth >= 1200 ? 'repeat(4, 1fr)' :
                              window.innerWidth >= 768 ? 'repeat(3, 1fr)' :
                              window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
          gap: '1.5rem',
          maxWidth: '80rem',
          margin: '0 auto'
        }}
      >
        <AnimatePresence>
          {Array.isArray(filteredRecipes) && filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/recipes/${recipe._id}`)}
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(249, 115, 22, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                {/* Recipe Image */}
                <div style={{ position: 'relative', overflow: 'hidden', height: '12rem' }}>
                  <motion.img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease-out'
                    }}
                    whileHover={{ scale: 1.08 }}
                  />

                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)',
                  }} />



                  {/* Heart Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '50%',
                      padding: '0.5rem',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to favorites logic here
                    }}
                  >
                    <FaHeart style={{
                      color: '#f97316',
                      fontSize: '1rem',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }} />
                  </motion.div>

                  {/* Cooking Time */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '1rem',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    <FaClock style={{ color: '#f97316' }} />
                    <span>{recipe.cookingTime || '30'} min</span>
                  </div>
                </div>

                {/* Recipe Content */}
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      color: 'white',
                      marginBottom: '0.75rem',
                      lineHeight: '1.3',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#f97316';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {recipe.title}
                  </h3>


                </div>
              </motion.div>
            ))
          ) : search ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                🔍
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">No recipes found</h3>
              <p className="text-gray-400">Try searching for something else: "{search}"</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button */}
      {!search && visibleCount < recipes.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadMore}
            style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #ea580c, #c2410c)';
              e.target.style.boxShadow = '0 15px 40px rgba(249, 115, 22, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #f97316, #ea580c)';
              e.target.style.boxShadow = '0 10px 30px rgba(249, 115, 22, 0.3)';
            }}
          >
            Load More
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Home;
