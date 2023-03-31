import mongoose from 'mongoose';

const connectDB = async () => {
  const URL = process.env.MONGO_URI;
  const connect = await mongoose.connect(URL);
  console.log('connect to DB!');
  return connect;
};

export default connectDB;
