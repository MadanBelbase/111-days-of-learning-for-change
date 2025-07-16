import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User"; // Adjust the import path to your User model
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

    // Sign JWT token - convert _id to string explicitly
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

    // Sign JWT token - convert _id to string explicitly
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

// OPTIONAL: getProfile example - returns current user info (requires auth middleware to set req.user)
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; // Make sure your auth middleware sets req.user properly

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const dbUser = await User.findById(user.userId).select("-password");
    if (!dbUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      id: dbUser._id,
      username: dbUser.username,
      email: dbUser.email,
      fullName: dbUser.fullName,
      phone: dbUser.phone,
      location: dbUser.location,
      terms: dbUser.terms,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error during fetching profile" });
  }
};
