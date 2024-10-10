import { connectToDatabase } from '../../../lib/mongodb'; 
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method } = req;

  
  const db = await connectToDatabase();
  const notificationsCollection = db.collection('notifications'); 

  switch (method) {
    case 'GET':
      
      try {
        const notifications = await notificationsCollection.find({}).toArray();
        res.status(200).json(notifications);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications' });
      }
      break;

    case 'POST':
      
      try {
        const { message, userId } = req.body; 
        const newNotification = {
          message,
          userId: ObjectId(userId),
          createdAt: new Date(),
        };

        await notificationsCollection.insertOne(newNotification);
        res.status(201).json(newNotification);
      } catch (error) {
        res.status(500).json({ message: 'Error creating notification' });
      }
      break;

    case 'DELETE':
      
      try {
        const { id } = req.query; 
        await notificationsCollection.deleteOne({ _id: ObjectId(id) });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting notification' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
