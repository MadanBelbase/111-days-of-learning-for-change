import React, { useState } from "react";
import "../styles/CreateBlog.css"; // We'll create this CSS file

const CreateBlog: React.FC = () => {
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFeaturedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="create-blog-page">
      <h1 className="create-blog-title">Create a New Blog Post</h1>
      
      <form className="blog-form">
        {/* Featured Image Preview */}
        {featuredImage && (
          <div className="image-preview-container">
            <h3 className="section-title">Featured Image Preview</h3>
            <img 
              src={featuredImage} 
              alt="Featured preview" 
              className="featured-image-preview"
            />
          </div>
        )}

        <div className="form-content">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="form-input"
              placeholder="Enter your blog title"
            />
          </div>

          {/* Excerpt */}
          <div className="form-group">
            <label htmlFor="excerpt" className="form-label">
              Excerpt (Short Description)
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              className="form-textarea"
              placeholder="A brief summary of your post"
            ></textarea>
          </div>

          {/* Featured Image Upload */}
          <div className="form-group">
            <label className="form-label">
              Featured Image
            </label>
            <div className="image-upload-container">
              <label className="image-upload-button">
                <span className="button-text">Choose Image</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="image-upload-input"
                />
              </label>
              {featuredImage && (
                <button 
                  type="button" 
                  onClick={() => setFeaturedImage(null)}
                  className="remove-image-button"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Categories/Tags */}
          <div className="form-group">
            <label htmlFor="tags" className="form-label">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="form-input"
              placeholder="technology, web development, design"
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content*
            </label>
            <textarea
              id="content"
              name="content" 
              rows={12}
              required
              className="form-textarea content-textarea"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>
          {/* Publish Options */}
          <div className="publish-options">
            <div className="radio-option">
              <input
                id="draft"
                name="status"
                type="radio"
                value="draft"
                defaultChecked
                className="radio-input"
              />
              <label htmlFor="draft" className="radio-label">
                Save as Draft
              </label>
            </div>
            <div className="radio-option">
              <input
                id="published"
                name="status"
                type="radio"
                value="published"
                className="radio-input"
              />
              <label htmlFor="published" className="radio-label">
                Publish Now
              </label>
            </div>
            <button
              type="submit"
              className="submit-button"
            >
              Save Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;