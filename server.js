import * as dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import { dbConnection } from './config/conn';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello World!!!!');
});

app.get('/test', (req, res) => {
	res.send({ message: 'test page', status: 200 });
});

app.listen(PORT, () => {
	dbConnection();
	console.log(`Example app listening on port ${PORT}`);
});
