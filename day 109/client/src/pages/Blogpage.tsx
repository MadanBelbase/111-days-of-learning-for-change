import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/blogpage.css';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  createdAt: string;
}

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/getblogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
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

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="page-header">
        <h1>Latest Articles</h1>
        <p className="subtitle">Discover insights and stories from our community</p>
      </header>

      <main className="content-grid">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <article key={blog._id} className="article-card">
              <Link to={`/blog-details/${blog._id}`} className="card-link">
                {blog.featuredImage ? (
                  <div className="image-container">
                    <img
                      src={`http://localhost:3000/uploads/${blog.featuredImage}`}
                      alt={blog.title}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="image-placeholder"></div>
                )}
                <div className="card-content">
                  {/* <time className="publish-date">{formatDate(blog.createdAt)}</time> */}
                  <h2>{blog.title}</h2>
                  <p className="excerpt">{blog.excerpt}</p>
                  <div className="read-more">
                    Read article <span className="arrow">→</span>
                  </div>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <p>No articles found. Check back later!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
