import mongoose from 'mongoose';

const { Schema } = mongoose;

const TransactionSchema = new mongoose.Schema({
   user: {
      type: String, // Username của người đặt phòng
      require: true,
   },
   hotel: {
      type: String, // _Id của khách sạn đã đặt
      require: true,
   },
   room: {
      type: [String], // Danh sách các phòng đã đặt
      require: true,
   },
   dateStart: {
      type: Date, // Ngày nhận phòng
      require: true,
   },
   dateEnd: {
      type: Date, // Ngày trả phòng
      require: true,
   },
   price: {
      type: Number, // Chi phí
      require: true,
   },
   payment: {
      type: String, // Hình thức thanh toán (Credit Card, Cash)
      require: true,
   },
   status: {
      type: String, // Tình trạng (Booked, Checkin, Checkout)
      require: true,
   },
});

export default mongoose.model('Transaction', TransactionSchema);
