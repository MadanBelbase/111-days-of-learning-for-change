import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Blog } from '../models/Blogmodel';

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, excerpt, content, tags, status } = req.body;
    const imageUrl = req.file?.filename || null;
    const user = (req as any).user;

    if (!title || !content) {
      res.status(400).json({ error: "Title and content are required." });
      return;
    }

    if (!user || !user.userId || !user.fullName) {
      res.status(401).json({ error: "Unauthorized: user info missing" });
      return;
    }

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      tags: tags ? tags.split(",").map((tag: string) => tag.trim()) : [],
      status: status || "draft",
      featuredImage: imageUrl,
      author: {
        _id: new mongoose.Types.ObjectId(user.userId),
        fullName: user.fullName,
      },
      likes: 0,
      shares: 0,
      comments: [],
      likedBy: [],
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: savedBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const GetBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ status: "published" })  
      .populate("author", "fullName username") 
      .sort({ createdAt: -1 }); 

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const GetBlogById= async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate("author", "fullName username");

    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// update blog code

export const UpadteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, tags, status } = req.body;
    const imageUrl = req.file?.filename || null;

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    blog.title = title || blog.title;
    blog.excerpt = excerpt || blog.excerpt;
    blog.content = content || blog.content;
    blog.tags = tags ? tags.split(',').map((tag: string) => tag.trim()) : blog.tags;
    blog.status = status || blog.status;

    if (imageUrl) {
      blog.featuredImage = imageUrl;
    }

    const updatedBlog = await blog.save();

    res.status(200).json({
      message: 'Blog updated successfully',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


