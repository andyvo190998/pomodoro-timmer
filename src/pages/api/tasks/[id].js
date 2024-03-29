const { default: Task } = require('@/models/Task');
const { default: connectDB } = require('@/models/db');

const { getSession } = require('next-auth/react');

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    const session = await getSession({ req });

    if (!session) {
      res.status(404).send({ message: 'Login required!' });
      return;
    }

    await connectDB();

    await Task.findByIdAndDelete(req.query.id);
    const data = await Task.find({ userId: session.token.id });
    res.send(data);
  }
};

export default handler;
