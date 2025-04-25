import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, 
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
