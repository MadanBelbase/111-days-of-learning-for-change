import express from "express";
import { getBlogById, addComment, addLike, addShare } from "../controller/blogController";
import {verifyToken } from "../middlewares/authenticateToken"

const blogrouter = express.Router(); // Make sure this is a Router instance!

// Correctly register route handlers
blogrouter.get("/getblogs/:id", getBlogById);
blogrouter.put("/getblogs/comment/:id", verifyToken , addComment);
blogrouter.put("/getblogs/like/:id", verifyToken ,addLike);
blogrouter.put("/getblogs/share/:id", verifyToken ,addShare);

export default blogrouter;

