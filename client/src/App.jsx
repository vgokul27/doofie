import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import About from "./pages/About";
import Favourites from "./pages/Favourites";
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navbar */}
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}

      {/* Sidebar */}
      {!hideLayout && sidebarVisible && (
        <div ref={sidebarRef} style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <Sidebar isOpen={sidebarVisible} onClose={() => setSidebarVisible(false)} />
        </div>
      )}

      {/* Page Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          flex: 1,
          padding: hideLayout ? "0" : "80px 16px 0 16px"
        }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addrecipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
            <Route path="/favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>

        {!hideLayout && <Footer />}
      </div>
    </div>
  );
}

export default App;
