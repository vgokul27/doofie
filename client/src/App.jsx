import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import About from "./pages/About";
import Settings from "./pages/Settings";
import ApiKey from "./pages/ApiKey";
import RecipeDetails from "./pages/RecipeDetails";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";

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
    <div>
      {/* Navbar */}
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}

      {/* Sidebar */}
      {!hideLayout && sidebarVisible && (
        <div ref={sidebarRef} className="sidebar-wrapper">
          <Sidebar collapsed={false} setCollapsed={setSidebarVisible} />
        </div>
      )}

      {/* Page Content */}
      <div style={{ flex: 1, padding: hideLayout ? "0" : "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/addrecipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/apikey" element={<ProtectedRoute><ApiKey /></ProtectedRoute>} />
          <Route path="/recipes/:id" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>

        {!hideLayout && <Footer />}
      </div>
    </div>
  );
}

export default App;
