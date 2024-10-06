import dbConnect from '../../../../lib/mongodb';
import Donor from '../../../../models/'; // Assuming you have a Donor model

export default async function handler(req, res) {
  await dbConnect();

  const { bloodType, location, urgency } = req.query;

  let filter = {};

  if (bloodType) {
    filter.bloodType = bloodType;
  }

  if (location) {
    filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search
  }

  if (urgency) {
    filter.urgency = urgency;
  }

  try {
    const donors = await Donor.find(filter);
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching donors' });
  }
}
