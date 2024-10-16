import dbConnect from '../../../../lib/connect';
import Appointment from '../../../../models/Appointment';
import Notification from '../../../../models/Notification'; 

export async function POST(req) {
    try {
        await dbConnect(); 

        const appointmentData = await req.json(); 

        const newAppointment = await Appointment.create(appointmentData);

        const notificationMessage = {
            message: `New appointment created for ${newAppointment.name} on ${newAppointment.date}`,
            createdAt: new Date(),
        };

        await Notification.create(notificationMessage);

        return new Response(JSON.stringify(newAppointment), { status: 201 });
    } catch (error) {
        console.error("Error saving appointment:", error); 
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}
