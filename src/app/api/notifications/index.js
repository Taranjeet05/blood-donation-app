import { connectToDatabase } from '../../../lib/mongodb'; // Ensure this is your MongoDB connection function
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  const db = await connectToDatabase();
  const notificationsCollection = db.collection('notifications'); // Ensure you have a notifications collection

  switch (method) {
    case 'GET':
      // Fetch notifications
      try {
        const notifications = await notificationsCollection.find({}).toArray();
        res.status(200).json(notifications);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications' });
      }
      break;

    case 'POST':
      // Create a new notification
      try {
        const { message, userId } = req.body; // assuming these are sent in the body
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
      // Delete a notification by id
      try {
        const { id } = req.query; // assuming id is passed in query params
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
