import dbConnect from '../../../../lib/connect'; 
import BloodRequest from '../../../models/BloodRequest';

export async function POST(req) {
  try {
    await dbConnect();
    
    const { requesterName, relation, bloodType, urgency, message } = await req.json();
    
    const newRequest = new BloodRequest({
      requesterName,
      relation,
      bloodType,
      urgency,
      message,
    });

    await newRequest.save();
    
    return new Response(JSON.stringify({ success: true, message: 'Blood request submitted successfully!' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
