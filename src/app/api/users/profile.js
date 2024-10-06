import connectMongo from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectMongo();
      const session = await getSession({ req });
      if (!session) return res.status(401).json({ error: 'Unauthorized' });

      const user = await User.findOne({ email: session.user.email });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      await connectMongo();
      const session = await getSession({ req });
      if (!session) return res.status(401).json({ error: 'Unauthorized' });

      const user = await User.findOneAndUpdate(
        { email: session.user.email },
        req.body,
        { new: true }
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
