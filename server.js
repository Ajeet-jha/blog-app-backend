import * as dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import { dbConnection } from './config/conn';

import { router } from './routes/userRouters';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/v1', router);

app.listen(PORT, () => {
	dbConnection();
	console.log(`Example app listening on port ${PORT}`);
});
