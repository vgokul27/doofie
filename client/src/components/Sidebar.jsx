import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaPlus,
  FaHeart,
  FaTimes,
  FaSignOutAlt,
  FaUtensils,
  FaInfoCircle,
  FaSignInAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const handleNavigation = (path) => {
    // Check if the path requires authentication
    const protectedRoutes = ["/addrecipe", "/favourites"];

    if (protectedRoutes.includes(path) && !currentUser) {
      // Redirect to login if user is not authenticated
      navigate("/login");
      onClose(); // Close sidebar after navigation
      return;
    }

    navigate(path);
    onClose(); // Close sidebar after navigation
  };

  const menuItems = [
    { path: "/home", label: "Home", icon: FaHome },
    { path: "/addrecipe", label: "Add Recipe", icon: FaPlus },
    { path: "/favourites", label: "Favourites", icon: FaHeart },
    { path: "/about", label: "About", icon: FaInfoCircle },
  ];

  // Simple animation variants
  const sidebarVariants = {
    hidden: {
      x: -320,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      x: -320,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    // Sidebar Panel - mobile sidebar panel
    <motion.div
      className="w-72 h-full bg-white/95 backdrop-blur-lg border-r border-gray-200/50 shadow-2xl flex flex-col"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sidebarVariants}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaUtensils className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            DOOFIE
          </h2>
        </div>
        <motion.button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <FaTimes className="text-gray-600" size={18} />
        </motion.button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6">
        <nav className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Icon
                  className={`text-lg ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-primary-600"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200/50">
        {currentUser ? (
          <motion.button
            onClick={() => handleNavigation("/login")}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 font-medium border border-red-200 hover:border-red-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </motion.button>
        ) : (
          <motion.button
            onClick={() => handleNavigation("/login")}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-all duration-200 font-medium border border-primary-200 hover:border-primary-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <FaSignInAlt className="text-lg" />
            <span>Login</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
