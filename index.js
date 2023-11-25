import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/authRouter.js';
import hotelRouter from './routes/hotelRouter.js';
import roomRouter from './routes/roomRouter.js';
import userRouter from './routes/userRouter.js';
import transactionRouter from './routes/transactionRouter.js';
import cookiesParser from 'cookie-parser';

const app = express();
dotenv.config();
const PORT = 8800;

//path => path folder

//connect Database
const connect = async () => {
   try {
      await mongoose.connect(process.env.MONGO);
      console.log('Connect to MongoDB !');
   } catch (error) {
      console.log(error);
   }
};

mongoose.connection.on('disconnected', () => {
   console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
   console.log('MongoDB connected');
});

//middlewares
app.use(cookiesParser())

app.use(express.json());

app.use('/api/hotels', hotelRouter);
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);

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
   console.log('connect to backend!');
   connect();
});
