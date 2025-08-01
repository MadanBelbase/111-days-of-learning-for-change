import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL = 'facebook/bart-large-cnn'; // or try 'sshleifer/distilbart-cnn-12-6'

export const generateSummary = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: 'Content is required' });
    return;
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        inputs: content,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const summary = response.data[0]?.summary_text || 'No summary generated';
    res.status(200).json({ summary });
  } catch (error: any) {
    console.error('HuggingFace error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};

