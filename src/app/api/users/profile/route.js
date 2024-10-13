import dbConnect from '../../../../../lib/connect';  
import User from '../../../../../models/User';        
import { getServerSession } from 'next-auth';      

export async function GET(req) {
    try {
        await dbConnect();

        const session = await getServerSession({ req });

        if (!session) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
            });
        }

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
