import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, 
  },
  bloodType: {
    type: String,
    required: false, 
  },
  contactNumber: {
    type: String,
    required: false, 
  },
  donations: [
    {
      donationDate: { type: Date },
      hospital: { type: String },
      amount: { type: Number },
    }
  ],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
