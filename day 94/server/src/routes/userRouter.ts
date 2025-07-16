import { Router } from 'express';
import { createBlog,GetBlog ,GetBlogById } from '../controller/userController';
import { upload } from '../middlewares/multer';
import  { verifyToken } from "../middlewares/authenticateToken"


const userRouter = Router();

// POST /create-blog
userRouter.post('/create-blog',verifyToken , upload.single("image"),createBlog);
userRouter.get('/getblogs', GetBlog);
userRouter.get('/getblogs/:id', GetBlogById);

export default userRouter;

