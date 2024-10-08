import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donationDate: { type: Date, required: true },
  amount: { type: Number, required: true }, 
  bloodType: { type: String, required: true },
  hospital: { type: String, required: true },
});

export default mongoose.models.Donation || mongoose.model('Donation', DonationSchema);
