import Task from '@/models/Task';
import connectDB from '@/models/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) {
      res.status(404).send({ message: 'Login required!' });
      return;
    }

    await connectDB();

    const newTask = await new Task({
      name: req.body.task,
      userId: session.token.id,
    });

    await newTask.save();
    // const data = await Task.find();
    const data = await Task.find({ userId: session.token.id });
    // console.log('1', data1);
    res.status(201).send(data);
    return;
  } else if (req.method === 'GET') {
    const session = await getSession({ req });
    if (!session) {
      res.status(404).send({ message: 'Login required!' });
      return;
    }

    const taskList = await Task.find({ userId: session.token.id });

    res.send(taskList);
  } else if (req.method === 'PUT') {
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

    const data = await Task.find({ userId: session.token.id });

    res.send(data);
    return;
  }
};

export default handler;
