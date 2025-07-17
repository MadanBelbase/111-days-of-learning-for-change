// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css'; 
import { Link } from 'react-router-dom'; 

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
}

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/getblogs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched blogs:', data);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Blogger",
      content: "InkNode has transformed my writing workflow. The intuitive interface makes publishing a breeze!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      content: "As someone who needs to publish regularly, InkNode saves me hours every week. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Travel Writer",
      content: "The best blogging platform I've used in 10 years of content creation. The features are perfectly tailored for writers.",
      rating: 4
    }
  ];

  const features = [
    {
      title: "AI-Powered Writing Assistant",
      description: "Get real-time suggestions to improve your writing clarity and SEO.",
      icon: "✍️"
    },
    {
      title: "Customizable Themes",
      description: "Choose from dozens of beautiful templates or create your own.",
      icon: "🎨"
    },
    {
      title: "Collaboration Tools",
      description: "Work with editors and co-writers in real-time with version control.",
      icon: "👥"
    },
    {
      title: "Analytics Dashboard",
      description: "Track your audience engagement and growth with detailed metrics.",
      icon: "📊"
    },
    {
      title: "Monetization Options",
      description: "Easily integrate ads, memberships, and affiliate marketing.",
      icon: "💰"
    },
    {
      title: "Cross-Platform Publishing",
      description: "Publish to your blog, social media, and email lists simultaneously.",
      icon: "🚀"
    }
  ];

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="home-container">
      <header className="cta-section">
        <div className="cta-content">
          <h1>Welcome to InkNode</h1>
          <p className="hero-subtitle">Craft your perfect blog with our powerful publishing platform</p>
        </div>
      </header>

      <main className="main-content">
        <section className="features-section">
          <div className="section-header">
            <h2>Powerful Features for Modern Bloggers</h2>
            <p className="section-subtitle">Everything you need to create, grow, and monetize your blog</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="blog-showcase">
          <div className="section-header">
            <h2>Popular Blog Posts</h2>
            <p className="section-subtitle">Discover what our community is writing about</p>
          </div>
          {loading ? (
            <div className="loading-state">Loading latest blogs...</div>
          ) : (
            <div className="blog-grid">
              {blogs.slice(0, 3).map((blog) => (
                <div key={blog._id} className="blog-card">
                  {blog.featuredImage ? (
                    <div className="blog-image-container">
                      <img
                        src={`http://localhost:3000/uploads/${blog.featuredImage}`}
                        alt={blog.title}
                        className="blog-image"
                      />
                    </div>
                  ) : (
                    <div className="no-image-placeholder">No image available</div>
                  )}
                  <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    <Link to={`/blog-details/${blog._id}`} className="read-more">Read More →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="testimonials-section">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p className="section-subtitle">Join thousands of satisfied creators</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Elevate Your Blogging Experience?</h2>
          <p>Join thousands of creators who publish with InkNode every day</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
