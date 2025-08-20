import { FaBars } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";


const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // Navigation handler for desktop links
  const handleNavClick = (path) => {
    navigate(path);
  };

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/addrecipe', label: 'Add Recipe' },
    { path: '/favourites', label: 'Favourites' },
    { path: '/about', label: 'About' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4rem',
        background: 'rgba(26, 26, 46, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 50
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '0 1rem'
      }}>
        {/* Hamburger - Mobile Only */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: window.innerWidth < 768 ? 'block' : 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            transition: 'background-color 0.2s'
          }}
          onClick={toggleSidebar}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <FaBars size={20} style={{ color: 'white' }} />
        </motion.div>

        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            position: window.innerWidth < 768 ? 'absolute' : 'relative',
            left: window.innerWidth < 768 ? '50%' : 'auto',
            transform: window.innerWidth < 768 ? 'translateX(-50%)' : 'none'
          }}
        >
          <h1 style={{
            fontSize: window.innerWidth < 768 ? '1.5rem' : '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #fb923c, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            DOOFIE
          </h1>
        </motion.div>

        {/* Desktop Navigation Links - Center */}
        <div style={{
          display: window.innerWidth >= 768 ? 'flex' : 'none',
          alignItems: 'center',
          gap: '2rem',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick(item.path)}
              style={{
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                transition: 'all 0.3s',
                background: location.pathname === item.path
                  ? 'linear-gradient(to right, #f97316, #ea580c)'
                  : 'transparent',
                color: location.pathname === item.path ? 'white' : '#d1d5db',
                boxShadow: location.pathname === item.path ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.color = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </div>

        {/* Auth Button - Right */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavClick(currentUser ? '/login' : '/signup')}
          style={{
            background: 'linear-gradient(to right, #f97316, #ea580c)',
            color: 'white',
            fontWeight: '600',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(to right, #ea580c, #c2410c)';
            e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}
        >
          {currentUser ? 'Logout' : 'Sign Up'}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;