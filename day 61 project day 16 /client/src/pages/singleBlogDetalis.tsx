import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  // other fields as needed
}

const SingleBlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getblogs/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading blog details...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      {/* add more blog details here */}
    </div>
  );
};

export default SingleBlogDetails;
