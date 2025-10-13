import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaBars, FaUtensils } from "react-icons/fa";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import About from "./pages/About";
import RecipeDetails from "./pages/RecipeDetails";
import Favourites from "./pages/Favourites";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import "./index.css";

function App() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const hideLayoutRoutes = ["/", "/login", "/signup"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarVisible
      ) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarVisible]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {!hideLayout && (
        <>
          {/* Desktop/Tablet Navbar - only shows on lg screens and up */}
          <Navbar />

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            {/* Mobile Hamburger Menu Bar - always visible on mobile */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-between p-4">
                {/* Hamburger Button */}
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <FaBars className="text-gray-700" size={20} />
                </button>

                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                    <FaUtensils className="text-white text-sm" />
                  </div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    DOOFIE
                  </h1>
                </div>

                {/* Spacer to keep logo centered */}
                <div className="w-10"></div>
              </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarVisible && (
              <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setSidebarVisible(false)}
              />
            )}

            {/* Mobile Sidebar Panel */}
            {sidebarVisible && (
              <div
                ref={sidebarRef}
                className="fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-out"
              >
                <Sidebar
                  isOpen={sidebarVisible}
                  onClose={() => setSidebarVisible(false)}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* Page Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          hideLayout ? "p-0" : "p-4 md:p-6 lg:p-8 pt-16 lg:pt-4" // Add top padding for mobile hamburger menu
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addrecipe"
                element={
                  <ProtectedRoute>
                    <AddRecipe />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favourites"
                element={
                  <ProtectedRoute>
                    <Favourites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipes/:id"
                element={
                  <ProtectedRoute>
                    <RecipeDetails />
                  </ProtectedRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer - Outside padded container for full width */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
