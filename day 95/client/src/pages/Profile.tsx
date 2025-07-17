import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

interface Blog {
  _id: string;
  title: string;
  content: string;
  status: string; 
  likes: number;
  shares: number;
  comments: any[];
  createdAt: string;
  updatedAt?: string;
}

interface UserData {
  id: string;
  fullName: string;
  username: string;
  email: string;
  token: string;
}

const Profile: React.FC = () => {
  const user = localStorage.getItem("user");
  const userData: UserData | null = user ? JSON.parse(user) : null;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.token) {
      axios.get(`http://localhost:3000/profile/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="login-prompt">
        <div className="login-card">
          <p>Please <Link to="/login" className="login-link">log in</Link> to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {userData.fullName.charAt(0).toUpperCase()}
          </div>
          <h1>Welcome back, {userData.fullName}!</h1>
          <div className="user-meta">
            <div className="meta-item">
              <span className="meta-label">Username</span>
              <span className="meta-value">{userData.username}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Email</span>
              <span className="meta-value">{userData.email}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">User ID</span>
              <span className="meta-value">{userData.id}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2 className="section-title">
            Your Blogs <span className="blog-count">{blogs.length}</span>
          </h2>
          
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : blogs.length > 0 ? (
            <div className="blog-grid">
              {blogs.map((blog) => (
                <div className="blog-card" key={blog._id}>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">{blog.content?.slice(0, 150)}...</p>
                  
                  <div className="blog-status">
                    <strong>Status:</strong> {blog.status}
                  </div>

                  <div className="blog-interactions">
                    <span>👍 Likes: {blog.likes}</span>
                    <span>💬 Comments: {blog.comments.length}</span>
                    <span>🔁 Shares: {blog.shares}</span>
                  </div>

                  <div className="blog-footer">
                    <span className="blog-date">
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    {blog.updatedAt && (
                      <span className="blog-date">
                        Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                    <Link to={`/blog/${blog._id}`} className="read-more">
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p>No blogs found.</p>
              <Link to="/create-blog" className="create-btn">
                Create your first blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
