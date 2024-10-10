import { hash } from 'bcryptjs';
import dbConnent from '../../../../lib/connect';
import User from '../../../../models/User';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name should be at least 2 characters long'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
  bloodType: z.string().min(2),
  contactNumber: z.string().min(10, 'Invalid contact number'),
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnent();

      const parsedData = registerSchema.parse(req.body);

      const userExists = await User.findOne({ email: parsedData.email });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await hash(parsedData.password, 12);

      const newUser = new User({
        ...parsedData,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
