import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useState } from "react";
import Sidebar from './Sidebar';
<style>
@import url('https://fonts.googleapis.com/css2?family=Calistoga&display=swap');
</style>

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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

        <div className="navbar-title">DOOFIE API</div>

        <ul className="nav-links">
          <li onClick={() => handleNavClick('/home')}>Home</li>
          <li onClick={() => handleNavClick('/addrecipe')}>Add Recipe</li>
          <li onClick={() => handleNavClick('/apikey')}>API Key</li>
          <li onClick={() => handleNavClick('/login')}>Logout</li>
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