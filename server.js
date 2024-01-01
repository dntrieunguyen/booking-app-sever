import express from 'express';
import dotenv from 'dotenv';
import cookiesParser from 'cookie-parser';
import dbConnect from './configs/dbconnect.js';
import { initRoute } from './routes/index.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cookiesParser());

app.use(express.json());

initRoute(app);

dbConnect();

app.listen(PORT, () => {
   console.log('Backend is running on ' + PORT);
});
