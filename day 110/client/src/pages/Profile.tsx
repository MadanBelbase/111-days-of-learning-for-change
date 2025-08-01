import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../styles/Profile.css";

interface Blog {
  _id: string;
  title: string;
  content: string;
  status: "published" | "draft";
  likes: number;
  shares: number;
  comments: any[];
  createdAt: string;
  updatedAt?: string;
  featuredImage?: string;
}

interface UserData {
  id: string;
  fullName: string;
  username: string;
  email: string;
}

const Profile: React.FC = () => {
  const token = localStorage.getItem("token");
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState<"published" | "draft">("published");

  const [userData, setUserData] = useState<UserData | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token && userId) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/auth/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { user, blogs } = res.data;
          setUserData(user);
          setBlogs(blogs || []);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch profile");
          setLoading(false);
          console.error(err);
        });
    } else {
      setError("Missing token or userId");
      setLoading(false);
    }
  }, [token, userId]);

  const filteredBlogs = blogs.filter(blog => blog.status === activeTab);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!userData) {
    return (
      <div className="auth-prompt">
        <div className="auth-card">
          <p>
            Please <Link to="/login">log in</Link> to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-layout">
      {/* User Profile Section */}
      <section className="user-profile">
        <div className="user-avatar">
          {userData.fullName.charAt(0).toUpperCase()}
        </div>
        <h1>{userData.fullName}</h1>
        <p className="user-handle">@{userData.username}</p>
        
        <div className="user-details">
          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{userData.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Member since</span>
            <span className="detail-value">
              {new Date(userData.id?.toString()).toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="blog-content">
        <div className="content-header">
          <h2>Your Content</h2>
          <div className="status-tabs">
            <button
              className={`tab-btn ${activeTab === "published" ? "active" : ""}`}
              onClick={() => setActiveTab("published")}
            >
              Published ({blogs.filter(b => b.status === "published").length})
            </button>
            <button
              className={`tab-btn ${activeTab === "draft" ? "active" : ""}`}
              onClick={() => setActiveTab("draft")}
            >
              Drafts ({blogs.filter(b => b.status === "draft").length})
            </button>
          </div>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <article key={blog._id} className={`blog-card ${blog.status}`}>
                {blog.featuredImage && (
                  <div className="card-image">
                    <img
                      src={`http://localhost:3000/uploads/${blog.featuredImage}`}
                      alt={blog.title}
                    />
                  </div>
                )}
                <div className="card-content">
                  <div className="card-header">
                    <span className={`status-badge ${blog.status}`}>
                      {blog.status}
                    </span>
                    <span className="post-date">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p className="excerpt">
                    {blog.content?.substring(0, 100)}...
                  </p>
                  <div className="card-stats">
                    <span>❤️ {blog.likes} Likes</span>
                    <span>💬 {blog.comments?.length || 0} Comments</span>
                    <span>↗️ {blog.shares} Shares</span>
                  </div>
                  <div className="card-actions">
                    <Link
                      to={`/edit-blog/${blog._id}`}
                      className="action-btn edit"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/blog-details/${blog._id}`}
                      className="action-btn view"
                    >
                      {blog.status === "published" ? "View" : "Preview"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              {activeTab === "published" ? "📭" : "📝"}
            </div>
            <h3>
              {activeTab === "published"
                ? "No published posts yet"
                : "No drafts saved"}
            </h3>
            <p>
              {activeTab === "published"
                ? "Your published posts will appear here"
                : "Start writing and save as draft"}
            </p>
            <Link to="/create-blog" className="create-btn">
              Create New Post
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;

