import express from 'express';
import { upload } from '../middleware/uploadImage';
import { registerUser } from '../controllers/userController';

const router = express.Router();

router.post('/register', upload.single('image'), registerUser);

export { router };
