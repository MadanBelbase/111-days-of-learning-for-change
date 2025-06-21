import { Router } from 'express';
import { createBlog,GetBlog ,GetBlogById} from '../controller/userController';
import multer from 'multer';
import { upload } from '../middlewares/multer';


const userRouter = Router();

// POST /create-blog
userRouter.post('/create-blog', upload.single("image"),createBlog);
userRouter.get('/getblogs', GetBlog);
userRouter.get('/getblogs/:id', GetBlogById);

export default userRouter;

