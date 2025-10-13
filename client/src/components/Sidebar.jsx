import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaHeart,
  FaTimes,
  FaSignOutAlt,
  FaUtensils,
  FaInfoCircle,
} from "react-icons/fa";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close sidebar after navigation
  };

  const menuItems = [
    { path: "/home", label: "Home", icon: FaHome },
    { path: "/addrecipe", label: "Add Recipe", icon: FaPlus },
    { path: "/favourites", label: "Favourites", icon: FaHeart },
    { path: "/about", label: "About", icon: FaInfoCircle },
  ];

  return (
    // Sidebar Panel - mobile sidebar panel
    <div className="w-80 h-full bg-white/95 backdrop-blur-lg border-r border-gray-200/50 shadow-2xl flex flex-col">
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
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
        >
          <FaTimes className="text-gray-600" size={18} />
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6">
        <nav className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                }`}
              >
                <Icon
                  className={`text-lg ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-primary-600"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200/50">
        <button
          onClick={() => handleNavigation("/login")}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 font-medium border border-red-200 hover:border-red-300"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
