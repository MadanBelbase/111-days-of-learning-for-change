import { Router } from 'express';
import { createBlog,GetBlog ,GetBlogById} from '../controller/userController';


const userRouter = Router();

// POST /create-blog
userRouter.post('/create-blog', createBlog);
userRouter.get('/getblogs', GetBlog);
userRouter.get('/getblogs/:id', GetBlogById);

export default userRouter;

