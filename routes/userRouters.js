import express from 'express';
import { upload } from '../middleware/uploadImage';
import {
	registerUser,
	getUsers,
	signInUser,
} from '../controllers/userController';

const router = express.Router();

router.post('/register', upload.single('image'), registerUser);
router.post('/signin', signInUser);
router.get('/users', getUsers);

export { router };
