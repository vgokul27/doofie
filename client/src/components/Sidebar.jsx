import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaKey, FaInfoCircle, FaTimes } from 'react-icons/fa';
import '../styles/sidebar.css'; 

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Menu</h3>
        <FaTimes className="close-icon" onClick={onClose} />
      </div>
      
      <ul className="sidebar-menu">
        <li onClick={() => handleNavigation('/home')}>
          <FaHome className="sidebar-icon" />
          <span>Home</span>
        </li>
        <li onClick={() => handleNavigation('/addrecipe')}>
          <FaPlus className="sidebar-icon" />
          <span>Add Recipe</span>
        </li>
        <li onClick={() => handleNavigation('/apikey')}>
          <FaKey className="sidebar-icon" />
          <span>API Key</span>
        </li>
        <li onClick={() => handleNavigation('/about')}>
          <FaInfoCircle className="sidebar-icon" />
          <span>About</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;