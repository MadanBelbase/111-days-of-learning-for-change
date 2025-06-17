import { Request, Response } from 'express';
import User from '../models/User';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, phone, location, password, terms } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    const user = new User({ fullName, username, email, phone, location, password, terms });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
