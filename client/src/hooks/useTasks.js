import { useEffect, useState } from "react";
import { taskServices } from '../services/tasks.js';
import toast from 'react-hot-toast';

export const useTasks = () => {
    const [loading, setLoading] = useState(true);
    const [toggling, setToggling] = useState({ load: false, id: 0 });
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await taskServices.getTasks();
                setTasks(data);
            } catch (err) {
                setError(err);
                toast.error(err?.message || 'Failed to load tasks!...');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const makeTask = async (data) => {
        try {
            const newTask = await taskServices.makeTask(data);
            setTasks(prev => [...prev, newTask]);
            toast.success('New task created!...');
            
            return newTask;
        } catch (err) {
            toast.error(err.response?.data?.message || err || 'Failed to create a task!...');
        }
    };

    const updateTask = async (id, data) => {
        try {
            const update = await taskServices.updateTask(id, data);
            setTasks(prev => prev.map(task => task._id === id ? update : task));
            toast.success('Updated task successfully!...');
            
            return update;
        } catch (err) {
            toast.error(err.response?.data?.message || err || 'Failed to update a task!...');
        }
    };

    const delTask = async (id) => {
        try {
            await taskServices.delTask(id);
            setTasks(prev => prev.filter(task => task._id !== id));
            toast.success('Task deleted!...');
        } catch (err) {
            toast.error(err.response?.data?.message || err || 'Failed to delete a task!...');
        }
    };

    const toggleStatus = async (id) => {
        try {
            setToggling({ load: true, id: id });
            const toggle = await taskServices.toggleStatus(id);
            setTasks(prev => prev.map(task => task._id === id ? toggle : task));
            setToggling({ load: false, id: 0 });
            
            toggle.completed ? toast('Task updated!...', { icon: '' }) : new Date(toggle.deadline) > new Date() ? toast('Task is overdue & pending', { icon: '' }) : toast('Task updated!...', { icon: '' });

            return toggle;
        } catch (err) {
            toast.error(err.response?.data?.message || err || 'Failed to toggle task status!...');
        }
    };


    return ({ tasks, loading, error, toggling, makeTask, updateTask, delTask, toggleStatus });
};