import express from 'express';
import dotenv from 'dotenv';
import cookiesParser from 'cookie-parser';
import dbConnect from './configs/dbconnect.js';
import { auth, hotel, room, transaction, user } from './routes/index.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cookiesParser());

app.use(express.json());

app.use('/api/hotels', hotel);
app.use('/api/auth', auth);
app.use('/api/rooms', room);
app.use('/api/users', user);
app.use('/api/transactions', transaction);

app.use((err, req, res, next) => {
   const errorStatus = err.status || 500;
   const errorMessage = err.message || 'Something went wrong!';
   return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
   });
});

app.listen(PORT, () => {
   console.log('Backend is running on ' + PORT);
   dbConnect();
});
