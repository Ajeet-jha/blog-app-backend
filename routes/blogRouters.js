import express from 'express';
import { postBlog } from '../controllers/blogController';
import { upload } from '../middleware/uploadImage';
import { isAuthenticated } from '../middleware/auth';

const router = express.Router();

router.post('/post_blog', isAuthenticated, upload.single('image'), postBlog);

export { router };
