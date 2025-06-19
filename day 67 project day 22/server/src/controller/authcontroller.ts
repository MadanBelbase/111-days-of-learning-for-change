import { Request, Response } from 'express';
import User from '../models/User';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Extend Request to include userId (for postProfile)
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// ==========================
// SIGNUP CONTROLLER
// ==========================
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, username, email, phone, location, password, terms } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: 'Email or username already exists' });
      return;
    }

    const user = new User({ fullName, username, email, phone, location, password, terms });
    await user.save(); // Assumes password is hashed via pre-save hook

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location,
      }
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// ==========================
// LOGIN CONTROLLER
// ==========================
export const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    if (typeof user.comparePassword !== 'function') {
      res.status(500).json({ message: 'comparePassword method is not implemented on the User model' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location,
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// ==========================
// PROFILE CONTROLLER
// ==========================
export const postProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
