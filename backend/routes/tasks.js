import express from 'express';
import Task from '../models/Task.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all tasks for authenticated user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
      .sort({ dateTime: 1 })
      .lean();

    // Transform _id to id for frontend compatibility
    const formattedTasks = tasks.map(task => ({
      id: task._id.toString(),
      text: task.text,
      completed: task.completed,
      dateTime: task.dateTime,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }));

    res.json(formattedTasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const { text, dateTime } = req.body;

    // Validation
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Task text is required' });
    }

    if (!dateTime) {
      return res.status(400).json({ error: 'Date and time are required' });
    }

    // Check if date is in the future
    const taskDate = new Date(dateTime);
    if (taskDate <= new Date()) {
      return res.status(400).json({ error: 'Task date must be in the future' });
    }

    const task = new Task({
      userId: req.userId,
      text: text.trim(),
      dateTime: taskDate,
      completed: false
    });

    await task.save();

    res.status(201).json({
      id: task._id.toString(),
      text: task.text,
      completed: task.completed,
      dateTime: task.dateTime
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const { text, dateTime, completed } = req.body;

    // Find task and verify ownership
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validation
    if (text !== undefined) {
      if (!text.trim()) {
        return res.status(400).json({ error: 'Task text cannot be empty' });
      }
      task.text = text.trim();
    }

    if (dateTime !== undefined) {
      const taskDate = new Date(dateTime);
      if (taskDate <= new Date() && !task.completed) {
        return res.status(400).json({ error: 'Task date must be in the future' });
      }
      task.dateTime = taskDate;
    }

    if (completed !== undefined) {
      task.completed = completed;
    }

    await task.save();

    res.json({
      id: task._id.toString(),
      text: task.text,
      completed: task.completed,
      dateTime: task.dateTime
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Toggle task completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;
    await task.save();

    res.json({
      id: task._id.toString(),
      text: task.text,
      completed: task.completed,
      dateTime: task.dateTime
    });
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({ error: 'Error toggling task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

export default router;
