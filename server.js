import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { dbConnection } from './config/conn';

import { router } from './routes/userRouters';
import { isAuthenticated, verifyRefresh } from './middleware/auth';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/v1', router);
app.get('/protected', isAuthenticated, (req, res) => {
	res.json({
		success: true,
		msg: 'Welcome user!!',
		email: req.email,
	});
});
app.post('/refresh', (req, res) => {
	const { email, refreshToken } = req.body;
	const isValid = verifyRefresh(email, refreshToken);
	if (!isValid) {
		return res
			.status(401)
			.json({ success: false, error: 'Invalid token,try login again' });
	}
	const accessToken = jwt.sign({ email }, 'accessSecret', {
		expiresIn: '2m',
	});
	return res.status(200).json({ success: true, accessToken });
});
app.listen(PORT, () => {
	dbConnection();
	console.log(`Example app listening on port ${PORT}`);
});
