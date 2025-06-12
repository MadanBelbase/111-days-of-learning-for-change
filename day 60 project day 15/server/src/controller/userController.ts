import { Request, Response } from 'express';
import  { Blog } from '../models/Blogmodel';

export const createBlog =async(req: Request, res: Response):Promise<void> => {
    try {
        const {title, excerpt, content, tags, status } = req.body;
    
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