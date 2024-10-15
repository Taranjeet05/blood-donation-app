import dbConnect from '../../../../lib/connect';
import BloodRequest from '../../../../models';

export default async function handler(req, res) {
  await dbConnect();

  const { bloodType, location, urgency } = req.query;

  const filters = {};
  if (bloodType) filters.bloodType = bloodType;
  if (location) filters.location = location;
  if (urgency) filters.urgency = urgency;

  try {
    const bloodRequests = await BloodRequest.find(filters);
    res.status(200).json(bloodRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blood requests', error });
  }
}
