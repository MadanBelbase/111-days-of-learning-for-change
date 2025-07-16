"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const multer_1 = require("../middlewares/multer");
const authenticateToken_1 = require("../middlewares/authenticateToken");
const userRouter = (0, express_1.Router)();
// POST /create-blog
userRouter.post('/create-blog', authenticateToken_1.verifyToken, multer_1.upload.single("image"), userController_1.createBlog);
userRouter.get('/getblogs', userController_1.GetBlog);
userRouter.get('/getblogs/:id', userController_1.GetBlogById);
userRouter.get("/getblogs/:userId", authenticateToken_1.verifyToken, userController_1.getUserBlogs);
exports.default = userRouter;
