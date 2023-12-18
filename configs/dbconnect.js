import mongoose from 'mongoose';
// Connect MongoDB at default port 27017.

const dbConnect = async () => {
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
export default dbConnect;
