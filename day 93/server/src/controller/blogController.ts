import { Request, Response } from "express";
import mongoose from "mongoose";
import { Blog } from "../models/Blogmodel"; // Adjust path if needed

// Get a blog by ID including comments, likes, shares
export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid blog ID" });
      return;
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


export const likeBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    const userIdStr = req.body.userId || "user_id_example"; // Replace with req.user._id in production
    const userId = new mongoose.Types.ObjectId(userIdStr);

    if (blog.likedBy.some(id => id.equals(userId))) {
      res.status(400).json({ error: "Already liked" });
      return;
    }

    blog.likes += 1;
    blog.likedBy.push(userId);
    await blog.save();

    res.json({ message: "Blog liked" });
  } catch (err) {
    res.status(500).json({ error: "Failed to like blog" });
  }
};

export const checkBlogLiked = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    const userIdStr =
      typeof req.query.userId === "string" ? req.query.userId : "user_id_example";
    const userId = new mongoose.Types.ObjectId(userIdStr);

    const liked = blog.likedBy.some(id => id.equals(userId));
    res.json({ liked });
  } catch (err) {
    res.status(500).json({ error: "Failed to check like status" });
  }
};



// Add a comment to a blog
export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { authorName, text } = req.body;

    if (!authorName || !text) {
      res.status(400).json({ error: "Author name and comment text are required" });
      return;
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    const comment = {
      _id: new mongoose.Types.ObjectId(),
      authorName,
      text,
      createdAt: new Date(),
    };

    blog.comments.push(comment);
    await blog.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to post comment" });
  }
};

// Share a blog
export const shareBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    blog.shares += 1;
    await blog.save();

    res.json({ message: "Blog shared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to share blog" });
  }
};
export const blogController = {
  getBlogById,
  likeBlog,
  checkBlogLiked,
  addComment,
  shareBlog
};