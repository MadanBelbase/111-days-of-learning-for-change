import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import DOMPurify from 'dompurify';
import '../styles/singleBlogDetails.css';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[]; // Changed to array for better handling
  featuredImage?: string;
  author: {
    _id: string;
    fullName: string;
  };
  likes: number;
  shares: number;
  comments: Comment[];
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
  const blogURL = `${window.location.origin}/blog-details/${id}`; // Dynamic URL for production

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [blogResponse, allBlogsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/getblogs/${id}`),
          axios.get('http://localhost:3000/getblogs'),
        ]);

        setBlog(blogResponse.data);
        setAllBlogs(allBlogsResponse.data.filter((b: Blog) => b._id !== id));
        // Check if user has liked the blog (requires user authentication)
        const likedStatus = await axios.get(`http://localhost:3000/api/getblogs/${id}/liked`, {
          withCredentials: true,
        });
        setLiked(likedStatus.data.liked);
      } catch (err) {
        console.error(err);
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
      const response = await axios.post(`http://localhost:3000/api/getblogs/comment/${id}`, newComment, {
        withCredentials: true,
      });
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
      await axios.post(`http://localhost:3000/api/getblogs/like/${id}`, {}, { withCredentials: true });
      setLiked(true);
      setBlog(prev => (prev ? { ...prev, likes: prev.likes + 1 } : prev));
    } catch (err) {
      console.error('Failed to like:', err);
      setError('Failed to like the blog. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      await axios.post(`http://localhost:3000/api/getblogs/share/${id}`);
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

  if (loading) return <div className="loading">Loading blog details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!blog) return <div className="not-found">Blog not found.</div>;

  return (
    <div className="main-details">
      <div className="left-details">
        <article className="blog-article">
          <h1 className="blog-title">{blog.title}</h1>

          {blog.featuredImage && (
            <img
              src={`http://localhost:3000/uploads/${blog.featuredImage}`}
              alt={blog.title}
              className="blog-featured-image"
            />
          )}

          <p className="blog-author">
            by <strong>{blog.author?.fullName}</strong>
          </p>

          <div className="blog-tags">
            {blog.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: (blog.content) }}
          />

          <div className="like-share-section">
            <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleLike} disabled={liked}>
              ❤️ Like <span>({blog.likes})</span>
            </button>
            <button className="share-btn" onClick={handleShare}>
              🔗 Share <span>({blog.shares})</span>
            </button>
          </div>
        </article>

        <section className="comments-section">
          <h2>Comments ({blog.comments.length})</h2>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Your name"
              value={newComment.authorName}
              onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
              required
            />
            <textarea
              placeholder="Write your comment..."
              value={newComment.text}
              onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
              required
            ></textarea>
            <button type="submit">Post Comment</button>
          </form>

          <div className="comments-list">
  {blog.comments.map((comment) => (
    <div key={comment._id?.toString()} className="comment-item">
      <p>
        <strong>{comment.authorName}</strong>{' '}
        <span className="comment-date">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </p>
      <p>{comment.text}</p>
    </div>
  ))}
</div>

        </section>
      </div>

      <div className="right-details">
        <h2 className="sidebar-title">Recommended Blogs</h2>
        <div className="recommended-blogs">
          {allBlogs.slice(0, 4).map((b) => (
            <Link to={`/blog-details/${b._id}`} key={b._id} className="recommended-blog-card">
              {b.featuredImage && (
                <img
                  src={`http://localhost:3000/uploads/${b.featuredImage}`}
                  alt={b.title}
                  className="recommended-thumbnail"
                />
              )}
              <div className="recommended-blog-content">
                <h3 className="recommended-blog-title">{b.title}</h3>
                <p className="recommended-blog-excerpt">{b.excerpt || 'Click to read more...'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogDetails;