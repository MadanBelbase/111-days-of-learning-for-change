import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User"; // Adjust path if needed
import {Blog} from "../models/Blogmodel"; // Import Blog model
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// SIGNUP
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, username, email, phone, location, password, terms } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: "Email or username already exists" });
      return;
    }

    // Create new user instance and save
    const user = new User({ fullName, username, email, phone, location, password, terms });
    await user.save();

    // Sign JWT token
    const token = jwt.sign(
      { userId: user._id, fullName: user.fullName },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// LOGIN
export const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Sign JWT token
    const token = jwt.sign(
      { userId: user._id, fullName: user.fullName },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const authUser = (req as any).user; // Set by auth middleware
    const { userId } = req.params;

    if (!authUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    console.log("Requested userId:", userId);
    console.log("Authenticated userId from token:", authUser.userId);

    if (authUser.userId !== userId) {
      res.status(403).json({ message: "Forbidden: You can't access other users' data" });
      return;
    }

    const dbUser = await User.findById(userId).select("-password");
    if (!dbUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    //  const blogs = await  Blog.find({ "author._id": dbUser._id }) 
    // //Blog.find({ author: dbUser._id })
    //   .sort({ createdAt: -1 })
    //   .select("title status likes shares comments createdAt updatedAt")
    //   .populate("comments.authorName", "fullName username")
    //   .lean();
    const blogs = await Blog.find({ "author._id": dbUser._id })
  .sort({ createdAt: -1 })
  // Remove .select() or include all needed fields like this:
  .select("title excerpt content tags featuredImage author likes shares comments likedBy createdAt updatedAt")
  .lean();

    res.json({
      user: {
        id: dbUser._id,
        username: dbUser.username,
        email: dbUser.email,
        fullName: dbUser.fullName,
        phone: dbUser.phone,
        location: dbUser.location,
        terms: dbUser.terms,
      },
      blogs,
    });
    console.log("blogs by user",blogs);
    // console.log("Authenticated userId from token:", authUser.userId);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error during fetching profile" });
  }
};

