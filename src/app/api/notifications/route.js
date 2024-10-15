import dbConnect from '../../../../lib/connect';
import Notification from '../../../../models/Notification';

export async function GET() {
  try {
    await dbConnect();
    const notifications = await Notification.find({}).sort({ createdAt: -1 }); 
    return new Response(JSON.stringify(notifications), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
