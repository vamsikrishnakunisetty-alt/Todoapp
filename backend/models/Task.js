import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  text: {
    type: String,
    required: [true, 'Task text is required'],
    trim: true,
    maxlength: [500, 'Task text cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  dateTime: {
    type: Date,
    required: [true, 'Task date and time is required']
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
taskSchema.index({ userId: 1, dateTime: 1 });
taskSchema.index({ userId: 1, completed: 1 });

export default mongoose.model('Task', taskSchema);
