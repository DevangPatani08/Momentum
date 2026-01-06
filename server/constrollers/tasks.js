const Task = require('../models/tasks.js');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while fetching data!...' });
    }
};

exports.makeTask = async (req, res) => {
    try {
        const { message, priority = 'on-convenience', deadline } = req.body;
        const newTask = new Task({ message, priority, deadline, userId: req.user._id });
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while creating a task!...' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) return res.status(404).json({ message: 'Task not found!...' });
        
        const { message, priority, deadline } = req.body;
        task.message = message;
        task.priority = priority;
        task.deadline = deadline;
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while updating a task!...' });
    }
};

exports.delTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!task) return res.status(404).json({ message: 'Task not found!...' });
        res.status(200).json({task, message: 'Task has been deleted successfully!...'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while deleting a task!...' });
    }
};

exports.toggleStatus = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        
        if (!task) return res.status(404).json({ message: 'Task not found!...' });
        
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date() : null;
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while changing task status!...' });
    }
};