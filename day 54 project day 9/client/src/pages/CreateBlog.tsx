import React, { useState } from "react";
import "../styles/CreateBlog.css";

const CreateBlog: React.FC = () => {
  // Store the actual File object for uploading
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  // Store a preview URL to show image preview
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFeaturedImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      console.log("Image uploaded:", file.name);
    }
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData();

    formData.append("title", (form.querySelector('[name="title"]') as HTMLInputElement).value);
    formData.append("excerpt", (form.querySelector('[name="excerpt"]') as HTMLInputElement).value);
    formData.append("content", (form.querySelector('[name="content"]') as HTMLInputElement).value);
    formData.append("tags", (form.querySelector('[name="tags"]') as HTMLInputElement).value);
    formData.append("status", (form.querySelector('[name="status"]') as HTMLInputElement).value);

    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    try {
      const response = await fetch("http://localhost:3000/user/create-blog", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Blog post submitted successfully");
        form.reset();
        setFeaturedImage(null);
        setFeaturedImagePreview(null);
      } else {
        console.error("Failed to submit blog post:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="create-blog-page">
      <h1 className="create-blog-title">Create a New Blog Post</h1>

      <form className="blog-form" onSubmit={handleSubmit}>
        {featuredImagePreview && (
          <div className="image-preview-container">
            <h3 className="section-title">Featured Image Preview</h3>
            <img
              src={featuredImagePreview}
              alt="Featured preview"
              className="featured-image-preview"
            />
          </div>
        )}

        <div className="form-content">
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

          <div className="form-group">
            <label className="form-label">Featured Image</label>
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
              {featuredImagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setFeaturedImage(null);
                    setFeaturedImagePreview(null);
                  }}
                  className="remove-image-button"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

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
            <button type="submit" className="submit-button">
              Save Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;

