import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand Name */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✍️</span>
          <span className="logo-text">InkNode</span> 
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/blogs" className="nav-link">Blogs</Link>
          </li>
          <li className="nav-item">
            <Link to="/create-blog" className="nav-link">Create Post</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;