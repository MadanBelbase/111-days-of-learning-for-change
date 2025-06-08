import { Request, Response } from 'express';

export const createBlog = (req: Request, res: Response): void => {
    const { excerpt, content, tags, status } = req.body;
    console.log("Received blog data:", req.body);
    res.status(200).json({ message: "Blog received" });
};

