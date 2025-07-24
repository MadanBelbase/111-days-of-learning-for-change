import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Blog {
  title: string;
  excerpt: string;
  category: string;
  featuredImage?: string;
}

const EditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Blog>({
    title: '',
    excerpt: '',
    category: '',
    featuredImage: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getblog/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to load blog.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/updateblog/${id}`, formData);
      navigate('/profile'); // redirect to profile or blogs list after update
    } catch (err) {
      setError('Failed to update blog.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Excerpt:</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlogPage;
