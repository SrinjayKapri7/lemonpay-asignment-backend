const Task = require('../models/Task');
const redisClient = require('../config/redisClient');
const CACHE_TTL = 300; // 5 min


const getUserTasksCacheKey = (userId) => `tasks:user:${userId}`;



exports.getTasks = async (req, res) => {
  const userId = req.userId;

  try {
    const cacheKey = getUserTasksCacheKey(userId);

    const cachedTasks = await redisClient.get(cacheKey);

    if (cachedTasks && cachedTasks?.length > 0) return res.json(JSON.parse(cachedTasks));

    // console.log("cache not hit")

    const tasks = await Task.find({ userId: userId }).sort({ dueDate: 1 });
    await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(tasks));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createTask = async (req, res) => {
  const userId = req.userId;
  const { taskName, description, dueDate } = req.body;

  try {
    const task = new Task({ userId: userId, taskName, description, dueDate });
    await task.save();

    // Invalidate cache for user's task list
    await redisClient.del(getUserTasksCacheKey(userId));

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateTask = async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.id;
  const { taskName, description, dueDate } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: userId },
      { taskName, description, dueDate },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    await redisClient.del(getUserTasksCacheKey(userId));
    // await redisClient.del(getTaskCacheKey(taskId));

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteTask = async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId: userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await redisClient.del(getUserTasksCacheKey(userId));
    // await redisClient.del(getTaskCacheKey(taskId));

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



