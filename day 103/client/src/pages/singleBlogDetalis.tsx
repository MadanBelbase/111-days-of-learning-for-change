import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/singleBlogDetails.css';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featuredImage?: string;
  author: {
    _id: string;
    fullName: string;
  };
  likes: number;
  shares: number;
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  _id?: string;
  authorName: string;
  text: string;
  createdAt: string;
}

const SingleBlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [newComment, setNewComment] = useState<Comment>({ authorName: '', text: '', createdAt: '' });
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const blogURL = `${window.location.origin}/blog-details/${id}`;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        const [blogResponse, allBlogsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/getblogs/${id}`),
          axios.get('http://localhost:3000/getblogs'),
        ]);

        setBlog(blogResponse.data);
        setAllBlogs(allBlogsResponse.data.filter((b: Blog) => b._id !== id));

        if (token) {
          const likedStatus = await axios.get(
            `http://localhost:3000/api/getblogs/${id}/liked`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLiked(likedStatus.data.liked);
        } else {
          setLiked(false);
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError('Failed to load blog details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.authorName || !newComment.text || !id) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to post a comment.");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/api/getblogs/comment/${id}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setBlog(prev => (prev ? { ...prev, comments: [response.data, ...prev.comments] } : prev));
      setNewComment({ authorName: '', text: '', createdAt: '' });
    } catch (err) {
      console.error('Failed to post comment:', err);
      setError('Failed to post comment. Please try again.');
    }
  };

  const handleLike = async () => {
    if (liked || !id) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to like this post.");
        return;
      }

      await axios.post(
        `http://localhost:3000/api/getblogs/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLiked(true);
      setBlog(prev => (prev ? { ...prev, likes: prev.likes + 1 } : prev));
    } catch (err) {
      console.error('Failed to like:', err);
      setError('Failed to like the blog. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to share this post.");
        return;
      }
  
      await axios.post(
        `http://localhost:3000/api/getblogs/share/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (navigator.share) {
        await navigator.share({
          title: blog?.title || 'Check out this blog',
          text: 'I found this blog interesting!',
          url: blogURL,
        });
      } else {
        await navigator.clipboard.writeText(blogURL);
        alert('Link copied to clipboard!');
      }
      setBlog(prev => (prev ? { ...prev, shares: prev.shares + 1 } : prev));
    } catch (err) {
      console.error('Failed to share:', err);
      setError('Failed to share the blog. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading blog details...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="retry-button">Retry</button>
    </div>
  );
  
  if (!blog) return (
    <div className="not-found-container">
      <h2>Blog not found</h2>
      <p>The blog you're looking for doesn't exist or may have been removed.</p>
      <Link to="/" className="home-link">Back to Home</Link>
    </div>
  );

  return (
    <div className="blog-details-container">
      <div className="blog-content-container">
        <article className="blog-article">
          <div className="blog-meta">
            <div className="author-info">
              <div className="author-avatar">
                {blog.author?.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="author-name">{blog.author?.fullName}</p>
                {/* <p className="publish-date">{formatDate(blog.createdAt)}</p> */}
              </div>
            </div>
            <div className="engagement-stats">
              <span className="stat-item">
                <i className="stat-icon">👁️</i> {Math.floor(blog.likes * 2.5)}
              </span>
              <span className="stat-item">
                <i className="stat-icon">❤️</i> {blog.likes}
              </span>
              <span className="stat-item">
                <i className="stat-icon">↗️</i> {blog.shares}
              </span>
            </div>
          </div>

          <h1 className="blog-title">{blog.title}</h1>

          {blog.featuredImage && (
            <div className="featured-image-container">
              <img
                src={`http://localhost:3000/uploads/${blog.featuredImage}`}
                alt={blog.title}
                className="featured-image"
              />
            </div>
          )}

          <div className="tags-container">
            {blog.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="action-buttons">
            <button 
              className={`like-button ${liked ? 'liked' : ''}`} 
              onClick={handleLike}
              disabled={liked}
            >
              <span className="button-icon">{liked ? '❤️' : '🤍'}</span>
              <span className="button-text">{liked ? 'Liked' : 'Like'}</span>
              <span className="button-count">({blog.likes})</span>
            </button>
            
            <button className="share-button" onClick={handleShare}>
              <span className="button-icon">↗️</span>
              <span className="button-text">Share</span>
              <span className="button-count">({blog.shares})</span>
            </button>
          </div>
        </article>

        <section className="comments-section">
          <div className="section-header">
            <h2>Comments ({blog.comments.length})</h2>
            <div className="divider"></div>
          </div>

          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your name"
                value={newComment.authorName}
                onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Share your thoughts..."
                value={newComment.text}
                onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                required
                className="form-textarea"
                rows={4}
              />
            </div>
            <button type="submit" className="submit-button">
              Post Comment
            </button>
          </form>

          <div className="comments-list">
            {blog.comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              blog.comments.map((comment) => (
                <div key={comment._id?.toString()} className="comment-card">
                  <div className="comment-header">
                    <div className="comment-author-avatar">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="comment-author">{comment.authorName}</p>
                      <p className="comment-date">
                        {new Date(comment.createdAt).toLocaleString([], {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <aside className="sidebar">
        <div className="sidebar-section">
          <h3 className="sidebar-title">About the Author</h3>
          <div className="author-card">
            <div className="author-avatar large">
              {blog.author?.fullName.charAt(0).toUpperCase()}
            </div>
            <h4 className="author-name">{blog.author?.fullName}</h4>
            <p className="author-bio">Content creator and blogger</p>
            {/* <button className="follow-button">Follow</button> */}
          </div>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">Recommended Reads</h3>
          <div className="recommended-blogs">
            {allBlogs.slice(0, 3).map((b) => (
              <Link to={`/blog-details/${b._id}`} key={b._id} className="recommended-blog">
                {b.featuredImage && (
                  <div className="recommended-thumbnail-container">
                    <img
                      src={`http://localhost:3000/uploads/${b.featuredImage}`}
                      alt={b.title}
                      className="recommended-thumbnail"
                    />
                  </div>
                )}
                <div className="recommended-content">
                  <h4 className="recommended-title">{b.title}</h4>
                  <p className="recommended-meta">
                    {formatDate(b.createdAt)} · {Math.floor(Math.random() * 15)} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* <div className="sidebar-section">
          <h3 className="sidebar-title">Tags</h3>
          <div className="tags-cloud">
            {Array.from(new Set(allBlogs.flatMap(b => b.tags)))
              .slice(0, 12)
              .map((tag) => (
                // <Link to={`/tag/${tag}`} key={index} className="tag-link">

                  {tag}
               
              ))}
          </div>
        </div> */}
      </aside>
    </div>
  );
};

export default SingleBlogDetails;

