import dbConnect from '../../../../../lib/connect'; 
import BloodRequest from '../../../../../models/BloodRequest';

export async function GET(req) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const bloodType = searchParams.get('bloodType');
    const location = searchParams.get('location');
    const urgency = searchParams.get('urgency');

    const query = {};
    if (bloodType) query.bloodType = bloodType;
    if (location) query.location = location;
    if (urgency) query.urgency = urgency;

    console.log('Query:', query);  

    const bloodRequests = await BloodRequest.find(query);

    return new Response(JSON.stringify(bloodRequests), { status: 200 });
  } catch (error) {
    console.error('Error fetching blood requests:', error);  
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
