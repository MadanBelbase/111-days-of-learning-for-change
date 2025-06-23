import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  excerpt?: string;
  content: string;
  tags?: string[];
  status: "draft" | "published";
  featuredImage?: string; // This will be the image URL or path
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featuredImage: {
      type: String, 
    },
  },
  {
    timestamps: true, 
  }
);

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
