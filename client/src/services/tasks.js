import api from './api.js';

export const taskServices = {
    getTasks: async () => {
        const res = await api.get('/tasks');
        return res.data;
    },
    makeTask: async (taskData) => {
        const res = await api.post('/tasks', taskData);
        return res.data;
    },
    updateTask: async (id, taskData) => {
        const res = await api.put(`/tasks/${id}`, taskData);
        return res.data;
    },
    delTask: async (id) => {
        const res = await api.delete(`/tasks/${id}`);
        return res.data;
    },
    toggleStatus: async (id) => {
        const res = await api.patch(`/tasks/${id}/toggle`);
        return res.data;
    },
};