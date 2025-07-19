import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment {
  _id: Types.ObjectId;
  authorName: string;
  text: string;
  createdAt: Date;
}

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featuredImage?: string;
  status: "draft" | "published";  // <-- add status here
  author: {
    _id: Types.ObjectId;
    fullName: string;
  };
  likes: number;
  shares: number;
  comments: IComment[];
  likedBy: Types.ObjectId[];
}

const blogSchema: Schema<IBlog> = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  featuredImage: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "draft" },  // <-- add status here
  author: {
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
  },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  comments: [
    {
      _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
      authorName: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
