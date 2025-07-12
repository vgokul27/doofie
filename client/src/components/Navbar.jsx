import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useState } from "react";
import Sidebar from './Sidebar';
import { useLocation } from "react-router-dom";


const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();


  // Navigation handler for desktop links
  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="navbar">
        {/* Hamburger - Mobile Only */}
        <div className="hamburger" onClick={() => setSidebarOpen(true)}>
          <FaBars size={24} />
        </div>

        <div className="navbar-title">DOOFIE</div>

        <ul className="nav-links">
            <li
              onClick={() => handleNavClick('/home')}
              className={location.pathname === '/home' ? 'active' : ''}
            >
              Home
            </li>
            <li
              onClick={() => handleNavClick('/addrecipe')}
              className={location.pathname === '/addrecipe' ? 'active' : ''}
            >
              Add Recipe
            </li>
            <li
              onClick={() => handleNavClick('/apikey')}
              className={location.pathname === '/apikey' ? 'active' : ''}
            >
              API Key
            </li>
            <li
              onClick={() => handleNavClick('/login')}
              className={location.pathname === '/login' ? 'active' : ''}
            >
              Logout
            </li>
        </ul>

      </nav>

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}

export default Navbar;