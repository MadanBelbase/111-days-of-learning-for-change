import React from "react";
import "../styles/CreateBlog.css";

const CreateBlog: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const blogData = {
      title: (form.querySelector('[name="title"]') as HTMLInputElement).value,
      excerpt: (form.querySelector('[name="excerpt"]') as HTMLTextAreaElement).value,
      content: (form.querySelector('[name="content"]') as HTMLTextAreaElement).value,
      tags: (form.querySelector('[name="tags"]') as HTMLInputElement).value,
      status: (form.querySelector('[name="status"]:checked') as HTMLInputElement).value,
    };

    try {
      const response = await fetch("http://localhost:3000/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        console.log("Blog post submitted successfully");
        form.reset();
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
