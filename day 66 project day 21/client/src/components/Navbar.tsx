import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // State to hold user info; you can replace this logic with your auth context or redux store
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Try to load user from localStorage (or other storage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user info from storage and state
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');  // Redirect to login page after logout
  };

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
          {user ? (
            <>
              <span className="nav-username">Welcome, {user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <li className="login-btn">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="signup-btn">
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
