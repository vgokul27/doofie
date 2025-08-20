<<<<<<< HEAD
import { motion } from "framer-motion";
import { FaUtensils, FaCode, FaDatabase, FaShieldAlt, FaHeart, FaUsers } from "react-icons/fa";

function About() {
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

  const features = [
    {
      icon: FaUtensils,
      title: "Recipe Management",
      description: "Add your favorite recipes with detailed instructions and beautiful images"
    },
    {
      icon: FaCode,
      title: "API Access",
      description: "Generate your own API key to integrate recipes into your applications"
    },
    {
      icon: FaDatabase,
      title: "Secure Storage",
      description: "All recipes are securely stored with MongoDB and Firebase authentication"
    },
    {
      icon: FaShieldAlt,
      title: "Quality Control",
      description: "Admin-curated content ensures trusted and verified recipes"
    }
  ];

  const technologies = [
    { name: "React", color: "text-blue-400", description: "Modern UI framework" },
    { name: "MongoDB", color: "text-green-400", description: "Database storage" },
    { name: "Firebase", color: "text-orange-400", description: "Authentication" },
    { name: "Node.js", color: "text-green-500", description: "Backend runtime" },
    { name: "Tailwind CSS", color: "text-cyan-400", description: "Styling framework" },
    { name: "Framer Motion", color: "text-purple-400", description: "Animations" }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '3rem 1rem'
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Hero Section */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              width: '5rem',
              height: '5rem',
              background: 'linear-gradient(to right, #f97316, #ea580c)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <FaUtensils style={{ color: 'white', fontSize: '2rem' }} />
          </motion.div>
          <h1 style={{
            fontSize: window.innerWidth < 768 ? '3rem' : '4rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #f97316, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem'
          }}>
            About Doofie 🍽️
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#d1d5db',
            maxWidth: '48rem',
            margin: '0 auto',
            lineHeight: '1.75'
          }}>
            A modern, user-friendly recipe management and sharing platform built with the MERN stack.
            Whether you're a home cook, a professional chef, or just someone who loves experimenting in the kitchen.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
                }}>
                  <IconComponent style={{ color: 'white', fontSize: '1.5rem' }} />
                </div>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#9ca3af',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Technology Stack */}
        <motion.div variants={itemVariants} className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Built With Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white/5 rounded-lg"
              >
                <div className={`text-2xl font-bold ${tech.color} mb-2`}>{tech.name}</div>
                <div className="text-gray-400 text-sm">{tech.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 max-w-4xl mx-auto"
          >
            <FaHeart className="text-primary-400 text-4xl mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-light text-white mb-6 italic">
              "Good food is the foundation of genuine happiness."
            </blockquote>
            <cite className="text-primary-400 font-semibold">– Auguste Escoffier</cite>
          </motion.div>
        </motion.div>

        {/* Community Section */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <div className="glass-card p-8">
            <FaUsers className="text-primary-400 text-4xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
            <p className="text-gray-300 mb-6">
              Connect with fellow food enthusiasts, share your culinary creations, and discover amazing recipes from around the world.
            </p>
            <div className="flex justify-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold">👨‍🍳</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold">📖</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold">🖼️</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold">🔑</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
=======
import "../styles/about.css";

function About() {
  return (
    <div className="about-container">
     <h2>About Doofie 🍽️</h2>
      <p>
        <strong>Doofie</strong> is a modern, user-friendly recipe management and sharing platform built with the MERN stack. 
        Whether you're a home cook, a professional chef, or just someone who loves experimenting in the kitchen, Doofie helps you:
      </p>

        <ul>
          <li>👨‍🍳 Add your favorite recipes</li>
          <li>📖 Explore delicious dishes with detailed instructions</li>
          <li>🖼️ View beautiful food images with nutrition details</li>
          <li>🔑 Generate your own API key to use recipes in your website</li>
        </ul>

      <p>
        This project is powered by <strong>MongoDB</strong> (for storing recipes), <strong>Firebase</strong> (for secure authentication), and <strong>React</strong> (for a smooth user experience).
      </p>

      <p>
        Only the admin has access to add new recipes, ensuring trusted and verified content. All users can explore, view, and use recipe data via API.
      </p>

      <p style={{ marginTop: "20px", fontStyle: "italic" }}>
        "Good food is the foundation of genuine happiness." – Auguste Escoffier
      </p>

    </div>
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb
  );
}

export default About;
