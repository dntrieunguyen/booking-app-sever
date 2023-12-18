import mongoose from 'mongoose';
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   type: {
      type: String,
      require: true,
   },
   city: {
      type: String,
      require: true,
   },
   address: {
      type: String,
      require: true,
   },
   distance: {
      type: String,
      require: true,
   },
   photos: {
      type: [String],
      require: true,
   },
   title: {
      type: String,
      require: true,
   },
   desc: {
      type: String,
      require: true,
   },
   rating: {
      type: Number,
      min: 0,
      max: 5,
   },
   featured: {
      type: Boolean,
      default: true,
   },
   cheapestPrice: {
      type: Number,
      require: true,
   },
   rooms: {
      type: [String],
      require: true,
   },
});

export default mongoose.model('Hotels', HotelSchema);
