import { Request, Response } from 'express';
import  { Blog } from '../models/Blogmodel';

export const createBlog =async(req: Request, res: Response):Promise<void> => {
    try {
        const {title, excerpt, content, tags, status , im} = req.body;
        const imageUrl = req.file?.filename;
    
        if (!title || !content) {
          res.status(400).json({ error: "Title and content are required." });
          return;
        }
    
        // Create a new blog document
        const newBlog = new Blog({
          title,
          excerpt,
          content,
          tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
          status,
          featuredImage: imageUrl || null, // Use the uploaded file name if available

          // featuredImage should be handled separately (e.g. file upload)
        });
    
        // Save to MongoDB
        const savedBlog = await newBlog.save();
    
        res.status(201).json({ message: "Blog created successfully", blog: savedBlog });
      } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

export const GetBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).limit(6);
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const GetBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {

    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


