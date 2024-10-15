import dbConnect from '../../../../../lib/connect'; 
import BloodRequest from '../../../../../models/BloodRequest';

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params; 
    
    await BloodRequest.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true, message: 'Blood request deleted successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params; 
    const { requesterName, relation, bloodType, location, urgency, message } = await req.json();

    const updatedRequest = await BloodRequest.findByIdAndUpdate(id, {
      requesterName,
      relation,
      bloodType,
      location,
      urgency,
      message,
    }, { new: true });

    return new Response(JSON.stringify({ success: true, request: updatedRequest }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
