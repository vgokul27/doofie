import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaHeart, FaInfoCircle, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    { path: '/home', icon: FaHome, label: 'Home' },
    { path: '/addrecipe', icon: FaPlus, label: 'Add Recipe' },
    { path: '/favourites', icon: FaHeart, label: 'Favourites' },
    { path: '/about', icon: FaInfoCircle, label: 'About' },
    { path: '/login', icon: FaSignOutAlt, label: 'Logout' }
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const menuItemVariants = {
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.3
      }
    }),
    closed: {
      opacity: 0,
      x: -20
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 w-80 h-full bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 border-r border-white/10 z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-white"
              >
                Menu
              </motion.h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <FaTimes className="text-white text-lg" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <ul className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.li
                    key={item.path}
                    custom={index}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation(item.path)}
                    className="flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-primary-600/20 hover:border-primary-500/30 border border-transparent group"
                  >
                    <IconComponent className="text-primary-400 text-lg group-hover:text-primary-300 transition-colors duration-300" />
                    <span className="text-white font-medium group-hover:text-primary-100 transition-colors duration-300">
                      {item.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;