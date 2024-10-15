import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  requestId: { type: String, required: true },
  selectedDate: { type: Date, required: true },
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
export default Appointment;
