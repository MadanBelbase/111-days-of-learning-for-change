// src/pages/HomePage.tsx
import React from 'react';
import '../styles/HomePage.css'; // Regular CSS import


const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to InkNode</h1>
        <p>Craft your perfect blog with us</p>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>Feature One</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="feature-card">
          <h2>Feature Two</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="feature-card">
          <h2>Feature Three</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <button className="cta-button">Sign Up Now</button>
      </section>
    </div>
  );
};

export default HomePage;