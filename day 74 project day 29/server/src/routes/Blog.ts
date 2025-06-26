import express from "express";
import { getBlogById, addComment, addLike, addShare } from "../controller/blogController";

const blogrouter = express.Router(); // Make sure this is a Router instance!

// Correctly register route handlers
blogrouter.get("/getblogs/:id", getBlogById);
blogrouter.post("/getblogs/comment/:id", addComment);
blogrouter.post("/getblogs/like/:id", addLike);
blogrouter.post("/getblogs/share/:id", addShare);

export default blogrouter;

