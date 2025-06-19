import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css';

interface User {
  username: string;
  fullName?: string;
  email?: string;
  // add other fields as needed
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      return;
    }

    // Fetch user profile
    axios.get('http://localhost:3000/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      setUser(response.data.user); // Adjust according to your API response structure
    })
    .catch(error => {
      console.error('Failed to fetch user profile:', error);
      // Possibly token expired or invalid - logout user
      handleLogout();
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✍️</span>
          <span className="logo-text">InkNode</span>
        </Link>

        <div className="menu-toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

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

          {user ? (
            <>
              <li className="nav-item nav-username">
                Welcome, {user.username}
              </li>
              <li className="nav-item">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
