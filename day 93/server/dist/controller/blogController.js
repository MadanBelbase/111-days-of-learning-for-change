"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addShare = exports.addLike = exports.addComment = exports.getBlogById = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Blogmodel_1 = require("../models/Blogmodel"); // adjust path if needed
// Get a blog by ID including comments, likes, shares
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "Invalid blog ID" });
            return;
        }
        const blog = await Blogmodel_1.Blog.findById(id);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.json(blog);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.getBlogById = getBlogById;
// Add comment to blog
const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorName, text } = req.body;
        console.log(req.body);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "Invalid blog ID" });
            return;
        }
        if (!authorName || !text) {
            res.status(400).json({ error: "authorName and text are required" });
            return;
        }
        const blog = await Blogmodel_1.Blog.findById(id);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        // Initialize comments if not present
        if (!Array.isArray(blog.comments)) {
            blog.comments = [];
        }
        const newComment = {
            authorName,
            text,
            createdAt: new Date(),
        };
        blog.comments.unshift(newComment);
        await blog.save();
        res.status(201).json(newComment);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.addComment = addComment;
// Add a like to blog
const addLike = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "Invalid blog ID" });
            return;
        }
        const blog = await Blogmodel_1.Blog.findById(id);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        blog.likes = (blog.likes || 0) + 1;
        await blog.save();
        res.json({ likes: blog.likes });
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.addLike = addLike;
// Add a share to blog
const addShare = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "Invalid blog ID" });
            return;
        }
        const blog = await Blogmodel_1.Blog.findById(id);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        blog.shares = (blog.shares || 0) + 1;
        await blog.save();
        res.json({ shares: blog.shares });
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.addShare = addShare;
