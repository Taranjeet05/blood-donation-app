import dbConnect from '../../../../../lib/connect';  
import User from '../../../../../models/User';        
import { getServerSession } from 'next-auth';      

export async function PUT(req) {
    try {
        await dbConnect();

        const session = await getServerSession({ req });

        if (!session) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
            });
        }

        const { bloodType, contactNumber } = await req.json();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },  
            { bloodType, contactNumber },   
            { new: true }                  
        );

        if (!updatedUser) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(updatedUser), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
