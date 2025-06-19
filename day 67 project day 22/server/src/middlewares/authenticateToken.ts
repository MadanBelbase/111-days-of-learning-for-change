import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || typeof decoded !== 'object' || !('id' in decoded)) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.userId = (decoded as JwtPayload).id;
    next();
  });
};
