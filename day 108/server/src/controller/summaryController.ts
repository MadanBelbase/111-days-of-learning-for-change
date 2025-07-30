import { Request, Response } from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummary = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: 'Content is required' });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Summarize this blog content in 4-5 sentences:\n\n${content}`,
        },
      ],
    });

    const summary = completion.choices[0]?.message?.content?.trim() || 'No summary generated';
    res.status(200).json({ summary });
  } catch (error: any) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};
