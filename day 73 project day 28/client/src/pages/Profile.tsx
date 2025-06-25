import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const Profile: React.FC = () => {
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (userData?.token) {
      axios
        .get("http://localhost:3000/blogByUser", {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          setBlogs(res.data.blogs || []);
        })
        .catch((err) => {
          console.error("Failed to fetch blogs:", err);
        });
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="login-prompt">
        Please <Link to="/login">log in</Link> to view your profile.
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Hello! {userData.fullName}</h1>
        <h2>Username: {userData.username}</h2>
        <h2>Email: {userData.email}</h2>
        <h2>User ID: {userData.id}</h2>
      </div>

      <div className="profile-blogs">
        <h2>Your Blogs ({blogs.length})</h2>
        {blogs.length > 0 ? (
          <ul className="blog-list">
            {blogs.map((blog: any, index: number) => (
              <li className="blog-item" key={index}>
                <h3>{blog.title}</h3>
                <p>{blog.content?.slice(0, 100)}...</p>
                <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-blogs">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;