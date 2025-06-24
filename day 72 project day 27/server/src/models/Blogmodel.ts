import mongoose, { Document, Schema, Types } from "mongoose";

// Interface
export interface IBlog extends Document {
  title: string;
  excerpt?: string;
  content: string;
  tags?: string[];
  status: "draft" | "published";
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
  author: Types.ObjectId; 
}

// Schema
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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model
export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
