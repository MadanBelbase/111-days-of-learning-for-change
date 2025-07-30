// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import '../styles/Homepage.css';
import { Link } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  createdAt: string;
  category?: string;
  readTime?: number;
  author?: {
    name: string;
    avatar?: string;
  };
}

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/getblogs');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const categories = ['all', ...Array.from(new Set(blogs.map(blog => blog.category).filter(Boolean)))] as string[];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'all' || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const regularPosts = filteredBlogs.slice(1);

  return (
    <div className="blog-container">
      <header className="blog-hero">
        <div className="hero-content">
          <h1>Discover & Share <span>Thought-Provoking</span> Stories</h1>
          <p className="subtitle">Explore ideas from creative minds worldwide</p>

          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tag ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {featuredPost && !searchQuery && (
        <section className="featured-post">
          <Link to={`/blog-details/${featuredPost._id}`} className="featured-link">
            <div className="featured-image">
              {featuredPost.featuredImage && (
                <img 
                  src={`http://localhost:3000/uploads/${featuredPost.featuredImage}`} 
                  alt={featuredPost.title}
                  loading="eager"
                />
              )}
            </div>
            <div className="featured-content">
              <span className="featured-badge">Featured</span>
              {featuredPost.category && (
                <span className="category-badge">{featuredPost.category}</span>
              )}
              <h2>{featuredPost.title}</h2>
              <p className="excerpt">{featuredPost.excerpt}</p>
              <div className="post-meta">
                {featuredPost.author && (
                  <div className="author-info">
                    {featuredPost.author.avatar ? (
                      <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="author-avatar"/>
                    ) : (
                      <div className="avatar-placeholder">
                        {featuredPost.author?.name?.charAt(0) ?? 'U'}
                      </div>
                    )}
                    <span>{featuredPost.author.name}</span>
                  </div>
                )}
                <time className="post-date">{formatDate(featuredPost.createdAt)}</time>
                {featuredPost.readTime && (
                  <span className="read-time">{featuredPost.readTime} min read</span>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      <main className="blog-main">
        {loading ? (
          <div className="loading-animation">
            <div className="spinner"></div>
            <p>Loading content...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
              <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2V7h-2v2z"/>
            </svg>
            <h3>No articles found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}>Clear filters</button>
          </div>
        ) : (
          <>
            <h2 className="section-title">{activeCategory === 'all' ? 'Latest Articles' : activeCategory}</h2>
            <div className="blog-grid">
              {regularPosts.map((blog) => (
                <article key={blog._id} className="blog-card">
                  <Link to={`/blog-details/${blog._id}`} className="card-link">
                    {blog.featuredImage && (
                      <div className="image-wrapper">
                        <img
                          src={`http://localhost:3000/uploads/${blog.featuredImage}`}
                          alt={blog.title}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="card-content">
                      {blog.category && (
                        <span className="category-badge">{blog.category}</span>
                      )}
                      <h3>{blog.title}</h3>
                      <p className="excerpt">{blog.excerpt}</p>
                      <div className="post-meta">
                        {blog.author && (
                          <div className="author-info">
                            <span>{blog.author.name}</span>
                          </div>
                        )}
                        <div className="meta-right">
                          <time className="post-date">{formatDate(blog.createdAt)}</time>
                          {blog.readTime && (
                            <span className="read-time">{blog.readTime} min read</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      <section className="newsletter-cta">
        <div className="cta-content">
          <h2>Stay updated with our latest stories</h2>
          <p>Subscribe to our newsletter for weekly insights</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
