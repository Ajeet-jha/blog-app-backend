import express from 'express';
import { upload } from '../middleware/uploadImage';
import { registerUser, getUsers } from '../controllers/userController';

const router = express.Router();

router.post('/register', upload.single('image'), registerUser);
router.get('/users', getUsers);

export { router };
