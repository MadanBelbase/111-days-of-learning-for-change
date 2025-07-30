import { Router } from 'express';
import { createBlog,GetBlog ,GetBlogById, UpadteBlog } from '../controller/userController';
import { upload } from '../middlewares/multer';
import  { verifyToken } from "../middlewares/authenticateToken"


const userRouter = Router();

// POST /create-blog
userRouter.get('/getblogs', GetBlog);
userRouter.post('/create-blog',verifyToken , upload.single("image"),createBlog);
userRouter.get('/getblogs/:id', GetBlogById);
userRouter.put("/updateblog/:id", verifyToken, upload.single("featuredImage"),UpadteBlog);

export default userRouter;

