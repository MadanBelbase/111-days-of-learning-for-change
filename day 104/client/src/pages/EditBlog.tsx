import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditBlog.css';

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [] as string[],
    status: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/getblogs/${id}`);
        const blog = response.data;

        setFormData({
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          tags: blog.tags || [],
          status: blog.status,
        });

        if (blog.featuredImage) setCurrentImage(blog.featuredImage);
      } catch {
        setError('Failed to load blog. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFeaturedImage(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('status', formData.status);
      if (featuredImage) formDataToSend.append('featuredImage', featuredImage);

      // await axios.put(`http://localhost:3000/updateblog/${id}`, formDataToSend, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,  // Attach token here
      //   },
      // });
      await axios.put(`http://localhost:3000/updateblog/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      setSuccess('Blog updated successfully!');
      setTimeout(() => navigate(`/blog-details/${id}`), 2000);
    } catch {
      setError('Failed to update blog. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-blog-loading">
        <div className="spinner"></div>
        <p>Loading blog content...</p>
      </div>
    );
  }

  return (
    <div className="edit-blog-container">
      <div className="edit-blog-header">
        <div className="header-content">
          <h1>Edit Blog Post</h1>
          <p>Make changes to your blog post below</p>
        </div>
        <Link to={`/blog-details/${id}`} className="back-button">← Back to Blog</Link>
      </div>

      <div className="edit-blog-content">
        {error && <div className="alert error-alert">⚠ {error}</div>}
        {success && <div className="alert success-alert">✓ {success}</div>}

        <form onSubmit={handleSubmit} className="edit-blog-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={10}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="featuredImage">Featured Image</label>
            {currentImage && (
              <div className="image-preview">
                <img
                  src={currentImage.startsWith('blob:') ? currentImage : `http://localhost:3000/uploads/${currentImage}`}
                  alt="Current featured"
                />
              </div>
            )}
            <input
              type="file"
              id="featuredImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tags-input">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button type="button" onClick={handleAddTag} disabled={!tagInput.trim()}>
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.tags.map((tag, idx) => (
                <span key={idx} className="tag">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? 'Updating...' : 'Update Blog Post'}
            </button>
            <button type="button" onClick={() => navigate(`/blog-details/${id}`)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
