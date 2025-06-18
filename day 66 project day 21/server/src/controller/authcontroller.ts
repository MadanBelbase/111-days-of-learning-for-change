import { Request, Response } from 'express';
import User from '../models/User';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, username, email, phone, location, password, terms } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: 'Email or username already exists' });
      return;
    }

    const user = new User({ fullName, username, email, phone, location, password, terms });
    await user.save();
    res.json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Server error' });
  }
};

export const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Make sure comparePassword is defined on user instance
    if (typeof user.comparePassword !== 'function') {
      res.status(500).json({ message: 'comparePassword method is not implemented' });
      return;
    }

    // comparePassword is usually async and returns a boolean
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Respond with user info (or generate and send JWT here)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
