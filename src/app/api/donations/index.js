import connectMongo from '../../../../lib/mongodb';
import Donation from '../../../../models/Donation';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await connectMongo();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      
      try {
        const donations = await Donation.find({ user: session.user.id });
        res.status(200).json(donations);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching donations' });
      }
      break;

    case 'POST':
      
      try {
        const { donationDate, amount, bloodType, hospital } = req.body;

        const newDonation = new Donation({
          user: session.user.id,
          donationDate,
          amount,
          bloodType,
          hospital,
        });

        await newDonation.save();
        res.status(201).json(newDonation);
      } catch (error) {
        res.status(400).json({ error: 'Error saving donation' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
