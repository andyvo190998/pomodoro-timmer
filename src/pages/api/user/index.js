import User from '@/models/User';
import connectDB from '@/models/db';
import hashPassword from '@/util/hash';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await connectDB();

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(404).send({ message: 'User email is existed' });
      return;
    }
    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      isAdmin: false,
    });

    const data = await newUser.save();
    res.send(data);
  }
};

export default handler;
