import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaSearch } from "react-icons/fa";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Load favourites from localStorage
    const savedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(savedFavourites);
  }, []);

  const filteredFavourites = favourites.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

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
      {/* Header */}
      <motion.div 
        variants={containerVariants}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(to right, #f97316, #ea580c)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}
        >
          <FaHeart style={{ color: 'white', fontSize: '1.5rem' }} />
        </motion.div>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #f97316, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem'
        }}>
          Your Favourite Recipes
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>
          All your saved recipes in one place
        </p>

        {/* Search Bar */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ position: 'relative', maxWidth: '32rem', margin: '2rem auto 0 auto' }}
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
              placeholder="Search your favourite recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

      {/* Favourites Grid */}
      <motion.div 
        variants={containerVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '80rem',
          margin: '0 auto'
        }}
      >
        {filteredFavourites.length > 0 ? (
          filteredFavourites.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.title}
                  style={{
                    width: '100%',
                    height: '12rem',
                    objectFit: 'cover',
                    transition: 'transform 0.5s'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }} />
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                >
                  <FaHeart style={{ color: '#f97316', fontSize: '1.25rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                </motion.div>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '0.5rem',
                  transition: 'color 0.3s'
                }}>
                  {recipe.title}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#9ca3af',
                  fontSize: '0.875rem'
                }}>
                  <span>⏱️ 30 min</span>
                  <span>🍽️ Easy</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem'
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ fontSize: '4rem', marginBottom: '1rem' }}
            >
              💔
            </motion.div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
              No favourite recipes yet
            </h3>
            <p style={{ color: '#9ca3af' }}>
              Start exploring recipes and add them to your favourites!
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Favourites;
