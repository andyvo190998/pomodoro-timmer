import Task from '@/models/Task';
import connectDB from '@/models/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    console.log('POST');

    const session = await getSession({ req });

    if (!session) {
      res.status(404).send({ message: 'Login required!' });
      return;
    }

    await connectDB();
    const newTask = await new Task({
      name: req.body.task,
    });

    await newTask.save();
    const data = await Task.find();
    console.log(data);
    res.status(201).send(data);
    return;
  } else if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session) {
      res.status(404).send({ message: 'Login required!' });
      return;
    }

    const data = await Task.find();
    res.send(data);
  } else if (req.method === 'PUT') {
    console.log('Put');

    const session = await getSession({ req });

    if (!session) {
      res.status(404).send({ message: 'Login required' });
      return;
    }

    await connectDB();
    await Task.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    const data = await Task.find();

    res.send(data);
    return;
  }
};

export default handler;
