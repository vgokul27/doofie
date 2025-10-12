import {
  FaHome,
  FaPlus,
  FaHeart,
  FaSignOutAlt,
  FaUtensils,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation handler for desktop links
  const handleNavClick = (path) => {
    navigate(path);
  };

  const navItems = [
    { path: "/home", label: "Home", icon: FaHome },
    { path: "/addrecipe", label: "Add Recipe", icon: FaPlus },
    { path: "/favourites", label: "Favourites", icon: FaHeart },
  ];

  return (
    // Only show navbar on large screens (desktop/tablet) - hidden on mobile
    <nav className="hidden lg:block sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaUtensils className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              DOOFIE
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={() => handleNavClick("/login")}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 font-medium border border-red-200 hover:border-red-300"
          >
            <FaSignOutAlt className="text-sm" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
