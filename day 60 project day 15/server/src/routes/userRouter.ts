import { Router } from 'express';
import { createBlog } from '../controller/userController';


const userRouter = Router();

// POST /create-blog
userRouter.post('/create-blog', createBlog);

export default userRouter;

