import express from "express";
import {
  getBlogById,
  likeBlog,
  checkBlogLiked,
  addComment,
  shareBlog,


} from "../controller/blogController";
import { verifyToken } from "../middlewares/authenticateToken";

const blogrouter = express.Router();

// Blog routes
blogrouter.get("/getblogs/:id", getBlogById);
blogrouter.post("/getblogs/like/:id", verifyToken, likeBlog);
blogrouter.get("/getblogs/:id/liked", verifyToken, checkBlogLiked);
blogrouter.post("/getblogs/comment/:id", verifyToken, addComment);
blogrouter.post("/getblogs/share/:id", verifyToken, shareBlog);


export default blogrouter;


