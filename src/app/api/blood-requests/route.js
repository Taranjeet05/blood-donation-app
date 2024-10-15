import dbConnect from '../../../../lib/connect'; 
import BloodRequest from '../../../../models/BloodRequest';
import Notification from '../../../../models/Notification'; 

export async function POST(req) {
  try {
    await dbConnect();
    const { requesterName, relation, bloodType, urgency, message, location } = await req.json();
    
    const newRequest = new BloodRequest({ requesterName, relation, bloodType, urgency, message, location });
    await newRequest.save();

    const notificationMessage = `Blood request submitted successfully! ${requesterName} needs blood of type ${bloodType}.`;
    const newNotification = new Notification({ message: notificationMessage });
    await newNotification.save();

    return new Response(JSON.stringify({ success: true, message: 'Blood request submitted successfully!' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    const deletedRequest = await BloodRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return new Response(JSON.stringify({ success: false, message: 'Blood request not found!' }), { status: 404 });
    }

    const notificationMessage = `Blood request for ${deletedRequest.requesterName} has been deleted.`;
    const newNotification = new Notification({ message: notificationMessage });
    await newNotification.save();

    return new Response(JSON.stringify({ success: true, message: 'Blood request deleted successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const requests = await BloodRequest.find({});
    return new Response(JSON.stringify({ success: true, requests }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
