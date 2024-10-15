import { connectToDatabase } from '../../../../lib/connect'; 
import Appointment from '../../../../models/Appointment'; 

export async function POST(request) {
  const { requestId, selectedDate, userEmail } = await request.json();

  try {
    await connectToDatabase(); 

    const newAppointment = new Appointment({
      requestId,
      selectedDate,
      userEmail,
      createdAt: new Date(),
    });

    await newAppointment.save();

    return new Response(JSON.stringify({ message: 'Appointment saved successfully!' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving appointment:', error);
    return new Response(JSON.stringify({ error: 'Failed to save appointment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
