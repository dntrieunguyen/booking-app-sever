import mongoose, { Schema } from 'mongoose';

const RoomSchema = new mongoose.Schema({
   title: {
      type: String,
      require: true,
   },
   price: {
      type: Number,
      require: true,
   },
   maxPeople: {
      type: Number,
      require: true,
   },
   desc: {
      type: String,
      require: true,
   },
   roomNumbers: {
      type: String,
      require: true,
   },
});

export default mongoose.model('Rooms', RoomSchema);
