import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
