import * as dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!!!!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})